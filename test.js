const fs = require('fs');
const validateSwagger = require('swagger-cli').validate;

let validations = [];

function walk(dir, level) {
  let list = fs.readdirSync(dir);
  list.forEach(function(file) {
    if (file.startsWith('.')) return;
    if (file === 'package.json') return;
    if (file === 'node_modules') return;

    file = dir + '/' + file;
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      walk(file, level + 1)
    } else {
      if (file.endsWith('.json') || file.endsWith('.yaml')) {
        console.log(`Validating "${file}"`);
        validations.push(validateSwagger(file));
      }
    }
  })
}

walk('.', 0);
console.log('-------');

Promise.all(validations).then(() => {
  console.log('All swaggers are valid');
}).catch(err => console.log(err.message));
