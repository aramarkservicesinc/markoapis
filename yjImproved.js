
// from https://stackoverflow.com/a/49699005/223953
function prompt(question) {
  const YAML = require('/usr/local/lib/node_modules/yaml');
  const FS = require('fs');

  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
    var text = FS.readFileSync('yaml/' + YFILE + '.yaml','utf8');
    text = JSON.stringify(YAML.parse(text), null, 4);
    FS.writeFile('json/' + YFILE + '.json', text, function(err) {
     if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

  });
}


async function main() {
  try {
    const YFILE = await prompt("Name of Yaml file (before the .yaml)?");
    const george = await prompt("What is your name?");
    console.log("Thank you.");
    stdin.pause();

  } catch(error) {
    console.log("There's an error!");
    console.log(error);
  }
  process.exit();
}

main();
//const doAsync = require('/usr/local/lib/node_modules/doasync');

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

