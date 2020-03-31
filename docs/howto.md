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

Note that in `sed` the "." period and backslash . \ do not need escaping but parens, forward slash, plus and question mark all do: ( ) / + ?

One great thing about `sed` is its ability to handle multiline replacement situations. In the following case an additional line was added after the line that was pattern matched with a regular expression in `sed`.

```bash
ls | xargs sed -i 's/\(url: https:\/\/dev-marko.aramark.net\/v1.\+\?\)/\1\n    description: Development server/g'
ls | xargs sed -i 's/\(url: https:\/\/qa-marko.aramark.net\/v1.\+\?\)/\1\n    description: Testing server/g'
```

The following removes the single-quoting of $ref uris in yaml docs. **It turns out that when converted to json the $refs will return null if the single quotes do not surround the uri. So the following is useful information for how to replace single quotes using `sed`, but it cannot and was not used in preparing yamls for the spec repository**.

```bash
ls | xargs sed -i 's/\($ref: \)\x27\(#\/components\/.\+\?\)\x27/\1\2/g'
```

Note: in sed, backslashes work to escape + ? ( ). They do not work to escape quotes. $ # . and : do not need any escaping. For `'` I used ascii notation to match them.

[Ascii reference](https://www.ascii-code.com/)

In sed need escaping but backslashes do not work:
* `\x27` - `'`
* `\x22` - `"`

In sed need escaping but backslashes do work. Ascii notation is an alternative:
* `\x28` - `(`
* `\x28` - `(`
* `\x2B` - `+`
* `\x2F` - `/`
* `\x3F` - `?`
