#!/bin/sh

git grep 'tesify/assert"' | \
    grep -e '^[^:]*\.go' | \
    
    awk '{
        print "erro: por favor use testify/require em vez de testify/assert"
        print

        exit 1
}'
