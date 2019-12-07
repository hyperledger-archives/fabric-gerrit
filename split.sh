#!/usr/bin/env bash
#
# This script is used to sort .md files into directories in blocks of 100. The
# resultant directories as named as a range of the the .md files contained
# inside the directories, i.e., dir: 100-200 contains 100.md to 200.md.
#
set -euo pipefail

dirs=$(ls -d -- */ | grep -v backup | grep -v cello)
for dir in ${dirs}; do
  cd "${dir}"
  ls | cut -d'.' -f1 | sort -n | xargs -n100 echo >data.out
  sed -i 'data' 's/data //g' data.out
  first=($(cut -d' ' -f1 <data.out))
  last=($(rev <data.out | cut -d" " -f1 | rev | tr -d "."))
  for ((i = 0; i < ${#first[@]}; ++i)); do
    mkdir "${first[${i}]}-${last[${i}]}" || true
    files=("$(sed "$(((i + 1)))!d" data.out)")
    for file in ${files[*]}; do
      mv "${file}.md" "${first[${i}]}-${last[${i}]}"
    done
  done
  rm -rf data*
  cd ..
done
