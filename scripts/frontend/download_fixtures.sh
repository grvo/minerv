#!/usr/bin/env bash

#
# faz o download dos equipamentos frontend mais recentes para o commit atual, subindo o pai do commit
# cadeia até max-commits commits (o padrão é 50 commits).
#

source scripts/packages/helpers.sh

print_help() {
    echo "uso: scripts/frontend/download_fixtures.sh [--branch <branch-name>] [--max-commits <number>]"
    echo
    echo "procura um pacote de dispositivo de front-end no registro de pacotes para confirmações em uma ramificação local."
    echo
    echo "se --branch não está especificado, o script usará a ramificação atual como uma referência de confirmação."
    echo "se --max-commits não está especificado, o padrão é de 50 commits."

    return
}

branch="HEAD"
max_commits_count=50

while [ $# -gt 0 ]; do
    case "$1" in
        --branch)
            shift
            branch="$1"
            ;;
        --max-commits)
            shift
            max_commits_count="$1"
            ;;
        *)
            print_help
            exit
            ;;
    esac

    shift
done

for commit_sha in $(git rev-list ${branch} --max-count="${max_commits_count}"); do
    API_PACKAGES_BASE_URL=https://gitlab.com/api/v4/projects/278964/packages/generic

    FIXTURES_PACKAGE="fixtures-${commit_sha}.tar.gz"
    FIXTURES_PACKAGE_URL="${API_PACKAGES_BASE_URL}/fixtures/${commit_sha}/${FIXTURES_PACKAGE}"

    echo "procurando acessórios de front-end para commit ${commit_sha}..."

    if ! archive_doesnt_exist "${FIXTURES_PACKAGE_URL}" > /dev/null 2>&1; then
        echo "encontramos acessórios frontend em ${FIXTURES_PACKAGE_URL}!"

        read_curl_package "${FIXTURES_PACKAGE_URL}" | extract_package

        break
    fi
done