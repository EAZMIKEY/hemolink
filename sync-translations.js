const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/messages');
const files = fs.readdirSync(dir);

const enPath = path.join(dir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

function fillMissing(target, source) {
  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      fillMissing(target[key], source[key]);
    } else {
      if (typeof target[key] === 'undefined') {
        target[key] = source[key];
      }
    }
  }
}

files.forEach(file => {
  if (file !== 'en.json' && file.endsWith('.json')) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fillMissing(data, enData);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  }
});

console.log('Translations synced!');
