const YAML = require('/usr/local/lib/node_modules/yaml');
const fs = require('fs');
//const doAsync = require('/usr/local/lib/node_modules/doasync');
var text = fs.readFileSync('yaml/food-waste.yaml','utf8');
text = JSON.stringify(YAML.parse(text), null, 4);

// see https://www.npmjs.com/package/doasync
/* doAsync(fs).readFile('./yaml/food-waste.yaml', 'utf8')
  .then(result => {
    console.dir(JSON.stringify(YAML.parse(result)));
  }); */
/* var jsonExport = function() {
  doAsync(fs).readFile('./yaml/food-waste.yaml', 'utf8')
  .then(result => {
    console.dir(JSON.stringify(YAML.parse(result)));
  });
}
// console.log(jsonExport());
*/
/*
doAsync(fs).readFile('./yaml/food-waste.yaml', 'utf8')
  .then(result => {
    jsonExport = JSON.stringify(YAML.parse(result));
  });
console.dir(jsonExport);
*/
 fs.writeFile("json/food-waste.json", text, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
/*
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
*/
// Or
// fs.writeFileSync('/tmp/test-sync');
// const doAsync = require('/usr/local/lib/node_modules/doasync');
// doAsync(YAML).readFile('./yaml/food-waste.yaml').then((data) => console.log(data));
/*
let y = `
      id: 1
      name: Jean
`;
let o = YAML.parse(y);

let s = JSON.stringify(o); */

