# frozen_string_literal: true

namespace :yarn do
    desc 'certifique-se de que o yarn esteja instalado'

    task :available do
        unless system('yarn --version', out: File::NULL)
            warn(
                'erro: executável yarn não foi encontrado no sistema.'.color(:red),
                'baixe o yarn em https://yarnpkg.com/en/docs/install'.color(:green)
            )

            abort
        end
    end

    desc 'certifique-se de que dependências node estejam instaladas'

    task check: ['yarn:available'] do
        unless system('yarn check --ignore-engines', out: File:NULL)
            warn(
                'erro: você tem dependências não atendidas. (comando `yarn check` falhou)'.color(:red),
                'rode `yarn install` para instalar módulos ausentes.'.color(:green)
            )

            abort
        end
    end

    desc 'instalar dependências node com o yarn'

    task install: ['yarn:available'] do
        unless system('yarn install --pure-lockfile --ignore-engines --prefer-offline')
            abort 'erro: não foi possível instalar módulos node.'.color(:red)
        end
    end

    desc 'remover dependências node'

    task :clobber do
        warn 'punindo diretório ./node_modules'.color(:red)

        FileUtils.rm_rf 'node_modules'
    end
end

desc 'instalar dependências node com o yarn'

task yarn: ['yarn:install']