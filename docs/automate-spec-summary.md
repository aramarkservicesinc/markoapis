# Extracting summaries of specs with awk and sed

awk -F"/" '$1 ~ /\$ref/ { print $4 }' oas3/yaml/labor-daily.yaml > refs.txt
awk -F"/" '$1 ~ /\$ref/ { print $4 }' oas3/yaml/labor-daily.yaml | awk -F"~" '!seen[$1]++' | sed s/\'//g | sed s/(.*)(Param)/param - \1/g > refs.txt

```bash
awk -F"/" '$1 ~ /\$ref/ { print $4 }' oas3/yaml/labor-daily.yaml | awk -F"~" '!seen[$1]++' | sed s/\'//g | sed -E "s/(.*)(Param)/param: \1/g" | sort > refs.txt
```
The above takes a api yaml and returns for example the following:

employee_schedule
employee_summary
labor_summary
param: bypassCache
param: employeeId
param: endDate
param: orgValue
param: smoke
param: startDate

