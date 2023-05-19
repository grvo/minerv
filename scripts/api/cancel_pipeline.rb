#!/usr/bin/env ruby

# frozen_string_literal: true

# requires
require 'optparse'
require_relative 'base'

class CancelPipeline < Base
    def initialize(options)
        super

        @pipeline_id = options.delete(:pipeline_id)
    end

    def execute
        client.cancel_pipeline(project, pipeline_id)
    end

    private

    attr_reader :pipeline_id
end

if $PROGRAM_NAME == __FILE__
    options = API::DEFAULT_OPTIONS.dup

    OptionParser.new do |opts|
        opts.on("-p", "--project PROJECT", String, "projeto para procurar por jobs (padrão é $CI_PROJECT_ID)") do |value|
            options[:project] = value
        end

        opts.on("-i", "--pipeline-id PIPELINE_ID", String, "um id de pipeline (padrão é $CI_PIPELINE_ID)") do |value|
            options[:pipeline_id] = value
        end

        opts.on("-t", "--api-token API_TOKEN", String, "um valor de um token de api com o scope `api`") do |value|
            options[:api_token] = value
        end

        opts.on("-E", "--endpoint ENDPOINT", String, "a endpoint da api para o token da api. (padrão é $CI_API_V4_URL e fallback para https://gitlab.com/api/v4)") do |value|
            options[:endpoint] = value
        end

        opts.on("-h", "--help", "printar essa ajuda") do
            puts opts

            exit
        end
    end.parse!

    CancelPipeline.new(options).execute
end