# Scripts used in manipulating specs

The following two one line scripts strips out single quotes `\x27` from from the server designation part of spec.
```bash
ls | xargs sed -i 's/\x27\(https:\/\/dev-marko.aramark.net\/v1.\+\?\)\x27/\1/g'
ls | xargs sed -i 's/\x27\(https:\/\/qa-marko.aramark.net\/v1.\+\?\)\x27/\1/g'
```
