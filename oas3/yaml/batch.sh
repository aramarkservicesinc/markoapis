#!/usr/bin/bash
for file in ./*.yaml
do
   node ../../yaml2json.js "$file"
done
