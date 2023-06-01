# frozen_string_literal: true

return unless ENV.key?('BENCHMARK')

require 'spec_helper'
require 'erb'
require 'benchmark/ips'

# serve para comparar algumas das pipelines e filtros do banzai
#
# não são definitivos, mas podem ser usados por um desenvolvedor para
# ter uma ideia aproximada de como a mudança ou adição de um novo filtro
# irão afetar na performance.
#
# rodar por:
#   benchmark=1 rspec spec/benchmarks/banzai_benchmark.rb
# ou
#   rake benchmark:banzai
#
# um filtro específico também pode ser comparado usando a
# variável de ambiente `filter`
#
#   benchmark=1 filter=mathfilter rspec spec/benchmarks/banzai_benchmark.rb --tag specific_filter
# ou
#   filter=mathfilter rake benchmark:banzai
#
# rubocop: disable rspec/topleveldescribepath

RSpec.describe 'referência de markdown do minerv', :aggregate_failures, feature_category: :team_planning do
    include MarkupHelper

    let_it_be(:feature)       { MarkdownFeature.new }

    let_it_be(:project)       { feature.project }
    let_it_be(:group)         { feature.group }
    let_it_be(:wiki)          { feature.wiki }
    let_it_be(:wiki_page)     { feature.wiki_page }
    let_it_be(:markdown_text) { feature.raw_markdown }

    let_it_be(:grafana_integration) { create(:grafana_integration, project: project) }

    let_it_be(:default_context) do
        {
            project: project,
            current_user: current_user,
            suggestions_filter_enabled: true
        }
    end

    let(:context) do
        Banzai::Filter::AssetProxyFilter.transform_context(default_context)
    end

    let!(:render_context) { Banzai::RenderContext.new(project, current_user) }

    before do
        stub_application_setting(asset_proxy_enabled: true)
        stub_application_setting(asset_proxy_secret_key: 'shared-secret')
        stub_application_setting(asset_proxy_url: 'https://assets.example.com')
        stub_application_setting(asset_proxy_whitelist: %w(gitlab.com *.mydomain.com))
        stub_application_setting(plantuml_enabled: true, plantuml_url: 'http://localhost:8080')
        stub_application_setting(kroki_enabled: true, kroki_url: 'http://localhost:8000')

        Banzai::Filter::AssetProxyFilter.initialize_settings
    end

    context 'pipelines' do
        it 'compara várias pipelines' do
            name = 'example.jpg'
            path = "images/#{name}"

            blob = double(name: name, path: path, mime_type: 'image/jpeg', data: nil)

            allow(wiki).to receive(:find_file).with(path, load_content: false).and_return(Gitlab::Git::WikiFile.new(blob))
            allow(wiki).to receive(:wiki_base_path) { '/namespace1/gitlabhq/wikis' }

            puts "\n--> comparando as pipelines full, wiki e plain\n"

            Benchmark.ips do |x|
                x.config(time: 10, warmup: 2)

                x.compare!
            end
        end
    end

    context 'filters' do
        it 'compara todos os filtros no fullpipeline' do
            benchmark_pipeline_filters(:full)
        end

        it 'compara todos os filtros no plainmarkdownpipeline' do
            benchmark_pipeline_filters(:plain_markdown)
        end

        it 'compara os filtros especificados no fullpipeline', :specific_filter do
            begin
                filter = ENV['FILTER'] || 'MarkdownFilter'
                filter_klass = "Banzai::Filter::#{filter}".constantize
            rescue NameError
                raise 'filtro especificado incorreto. exemplo correto: filter=mathfilter'
            end

            benchmark_pipeline_filters(:full, [filter_klass])
        end
    end

    # construir texto fonte para cada filtro
    def build_filter_text(pipeline, initial_text)
        filter_source = {}
        input_text    = initial_text
        result        = nil

        pipeline.filters.each do |filter_klass|
            # armazenar entradas para o filter_klass atual
            filter_source[filter_klass] = { input_text: input_text, input_result: result }

            filter = filter_klass.new(input_text, context, result)
            output = filter.call

            # guarde-os para o próximo filter_klass
            input_text = output
            result = filter.result
        end

        filter_source
    end

    def benchmark_pipeline_filters(pipeline_type, filter_klass_list = nil)
        pipeline      = Banzai::Pipeline[pipeline_type]
        filter_source = build_filter_text(pipeline, markdown_text)

        filter_msg = filter_klass_list ? filter_klass_list.first.name.demodulize : 'todos os filtros'
        puts "\n--> comparando #{filter_msg} para #{pipeline.name.demodulize}\n"

        Benchmark.ips do |x|
            x.config(time: 10, warmup: 2)

            filters = filter_klass_list || pipeline.filters

            filters.each do |filter_klass|
                label = filter_klass.name.demodulize.delete_suffix('filtro').truncate(20)

                x.report(label) do
                    filter = filter_klass.new(filter_source[filter_klass][:input_text],
                                              context,
                                              filter_source[filter_klass][:input_result])
                    filter.call
                end
            end

            x.compare!
        end
    end

    # falsificar auxiliar `current_user`
    def current_user
        feature.user
    end
end