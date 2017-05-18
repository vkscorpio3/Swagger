const fs = require('fs');

const BASE_URL = 'https://darshan-shivashankar.github.io/Swagger/';
const BASICS_FOLDER = 'API Basics';
const OUTPUT_FILENAME = 'specs.config.js';

function slugify(text) {
  return text.replace(/\s/g, '-').replace('&', 'and');
}

let specs = [];

function walk(dir, level) {
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    if (file.startsWith('.')) return;
    if (file === 'node_modules') return;
    if (file === 'package.json') return;

    file = dir + '/' + file;
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      walk(file, level + 1)
    } else {
      if (file.endsWith('.json') || file.endsWith('.yaml')) {
        specs.push({url: file.substring(2), level: level});
      }
    }
  })
}

walk('.', 0);

let config = {};
for (let spec of specs) {
  if (spec.level === 0) {
    continue;
  } else if (spec.level === 1) {
    let [title,] = spec.url.split('/');
    config[title] = { title, id: slugify(title), url: BASE_URL + spec.url}
  } else if (spec.level === 3) {
    let [groupTitle, title, version, ] = spec.url.split('/');
    config[groupTitle] = config[groupTitle] || { title: groupTitle, items: {} };
    config[groupTitle].items[title] = config[groupTitle].items[title] || {title, id: slugify(title), versions: []};
    config[groupTitle].items[title].versions.push({name: version, url: BASE_URL + spec.url})
  } else {
    throw Error(`Unsupported dirctory structure at ${spec.url}`);
  }
}

let result = [];
result.push(config[BASICS_FOLDER]);
delete config[BASICS_FOLDER]

for (const key in config) {
  let group = config[key];
  if (group.items) group.items = Object.values(group.items);
  result.push(group);
}

fs.writeFileSync(OUTPUT_FILENAME, `window.SPECS_CONFIG = ${JSON.stringify(result, null, 2)};`);

console.log("Config sucessfully updated...");
