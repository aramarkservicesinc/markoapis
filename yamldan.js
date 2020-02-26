const YAML = require('yaml');
const fs = require('fs');
var yamlFile = process.argv[2];
var text = fs.readFileSync(yamlFile,'utf8');
text = JSON.stringify(YAML.parse(text), null, 4);
yamlFile =  yamlFile.replace(".yaml", ".json");
fs.writeFile('../json/' + yamlFile, text, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('The file json/' + yamlFile + ' was saved!');
});
