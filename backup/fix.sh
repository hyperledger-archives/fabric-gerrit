#!/usr/bin/env bash

dirs=$(ls -d -- */)
for dir in ${dirs}; do
    cd ${dir}
    rm -rf *.json*.o*
    files=$(ls)
    for file in ${files}; do
        sed -i '.orig' 's/^}/},/g' ${file}
        sed -i '.orig' '1 s/{/[{/g' ${file}
        sed -i '.orig' '$ s/},/}]/g' ${file}
    done
    rm -rf *.json*.o*
    cd ..
done