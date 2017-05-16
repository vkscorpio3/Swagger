const fs = require('fs');

const BASE_URL = 'https://darshan-shivashankar.github.io/Swagger/';

function slugify(text) {
  return text.replace(/\s/g, '-').replace('&', 'and');
}

const topOrder = [
  'API Basics',
  'Payments',
  'Credit & Financing',
  'E-Commerce'
];

let specs = [];

function walk(dir, level) {
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    if (file.startsWith('.')) return;
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

// FIXME: temporary hack to not rename folder
config['API Basics'] = config['Intro'];
delete config['Intro'];

config = topOrder.map(key => {
  let group = config[key];
  if (group.items) group.items = Object.values(group.items);
  return group;
})

fs.writeFileSync('specs.config.js', `window.SPECS_CONFIG = ${JSON.stringify(config, null, 2)};`);
console.log("Config sucessfully updated...");
