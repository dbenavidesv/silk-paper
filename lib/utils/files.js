const fs = require('fs');

exports.createFile = (path, key, content) => {
  fs.mkdirSync(`${process.cwd()}/${path}`, { recursive: true });
  fs.writeFileSync(`${process.cwd()}/${path}/${key}`, content);
};
