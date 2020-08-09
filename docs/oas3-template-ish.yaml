This pulls out all lines with "$ref" and puts it into refs.txt
````bash
awk -F"/" '$0 ~ /\$ref/ { print $0 }' aggregate.yaml > refs.txt
````

From that culling it copies only lines that are parameters and puts in refs2.txt
````bash
awk '$0 ~ /parameters/ { print $0 }' refs.txt > refs2.txt
````

Copied unique lines from refs2.txt and copied them to refs3.txt
````bash
awk '!seen[$0]++' refs2.txt > refs3.txt
````

To prep them for alphabetizing them in a spreadsheet in vim I replaced "/" with a tab. Then sorted on the param column. Then replaced the tabs with "/" again. Now you have an alphabetized list of all the $refs to be put in a template for purpose of moving all params to components section of yaml as part of upgrade to oas3.

