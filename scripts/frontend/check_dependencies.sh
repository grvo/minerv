#!/usr/bin/env bash

if ! yarn check --integrity 2>&1 > /dev/null

then
    echo
    echo "    $(tput setaf 1)yarn check --integrity$(tput sgr0) falhou!"
    echo "    suas dependências provavelmente não correspondem ao arquivo yarn.lock."
    echo "    por favor rode $(tput setaf 2)yarn install$(tput sgr0) e tente novamente."
    echo

    exit 1
fi