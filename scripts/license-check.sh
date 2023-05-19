#!/usr/bin/env bash

set -euo pipefail

# esse script roda a gema licensefinder para verificar de que todas as licenças estejam
# compliant. porém, bundler v2.2+ e licensefinder não funcionam bem mutuamente quando:
#
# 1. possui gemas instaladas nativamente (exemplo: nokogiri, grpc, google-protobuf, etc...)
# 2. gemfile.lock não lista as gemas platform-specific que estão instaladas
#
# explicação completa aqui:
# https://github.com/pivotal/LicenseFinder/issues/828#issuecomment-953359134
#
# para trabalhar ao redor do problema, configurar bundler para instalar gemas para
# a plataforma ruby atual, onde as causas gemfile e gemfile.lock precisariam
# estar sendo atualizadas em gemas platform-specific

PROJECT_PATH=${1:-`pwd`}

echo "usando path de projeto ${PROJECT_PATH}"

GEMFILE_DIFF=`git diff Gemfile Gemfile.lock`

if [ ! -z "$GEMFILE_DIFF" ]; then
    echo "licensefinder precisa trancar a gemfile para a plataforma atual, porém gemfile ou gemfile.lock possui mudanças."

    exit 1
fi

BUNDLE_DEPLOYMENT=false BUNDLE_FROZEN=false bundle lock --add-platform `ruby -e "puts RUBY_PLATFORM"`
bundle exec license_finder --decisions-file config/dependency_decisions.yml --project-path ${PROJECT_PATH}

git checkout -q Gemfile Gemfile.lock