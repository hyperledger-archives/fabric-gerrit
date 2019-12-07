#!/usr/bin/env bash
#
# The raw output of the gerrit export is a file containing multiple JSON objects, not in an array
# and missing the commas separting the objects. This scripts wraps the objects in an array and
# adds commas to the end of each object as necessary
#
set -euo pipefail

cd backup
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
cd ..