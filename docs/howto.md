# Scripts used in manipulating specs

The following `tail` script concatenates all the yaml files of a particular directory into one text file each separated by the name of the file:

```bash
tail -n +1 *.yaml > aggregate.yaml # assumes command is run from same directory where files are and outputs a file called aggregate.yaml
```

The following two one line scripts strips out single quotes `\x27` from from the server designation part of spec.

```bash
ls | xargs sed -i 's/\x27\(https:\/\/dev-marko.aramark.net\/v1.\+\?\)\x27/\1/g'
ls | xargs sed -i 's/\x27\(https:\/\/qa-marko.aramark.net\/v1.\+\?\)\x27/\1/g'
```

The following scripts were able to bulk add the description field to the server definition in the spec yamls.

Note that in `sed` the "." period and backslash . \ do not need escaping but parens, forward slash, plus and question mark all do: ( / + ?

One great thing about `sed` is its ability to handle multiline replacement situations. In the following case an additional line was added after the line that was pattern matched with a regular expression in `sed`.

```bash
ls | xargs sed -i 's/\(url: https:\/\/dev-marko.aramark.net\/v1.\+\?\)/\1\n    description: Development server/g'
ls | xargs sed -i 's/\(url: https:\/\/qa-marko.aramark.net\/v1.\+\?\)/\1\n    description: Testing server/g'
```

Sometimes we want to limit a `sed` search and replace to specific lines. The following removes the unnecessary single-quoting of $ref uris in yaml docs.

```bash
ls | xargs sed -i 's/\(\x24ref: \)\x27\(\x23\/components\/.\+\?\)\x27/\1\2/g'
```

Note: in sed, backslashes work to escape + ? ( ). They do not work to escape quotes. Dots . and : do not need any escaping. Not sure about # or $. For ' $ and # I used ascii notation to match them.

[Ascii reference](https://www.ascii-code.com/)

* \x27 - `'`
* \x23 - `#`
* \x24 - `$`
* \x22 - `"`

