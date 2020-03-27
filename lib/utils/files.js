const fs = require('fs');

const { SLASH_SYMBOL } = require('../constants');

exports.createFile = (path, content) => {
  const pathList = path.split(SLASH_SYMBOL);
  pathList.pop();
  const dir = pathList.join(SLASH_SYMBOL);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path, content);
};

exports.fileExists = path => fs.existsSync(path);

exports.readFile = path =>
  // TODO: Read extension
  // It's only for json objects for now
  JSON.parse(fs.readFileSync(path, 'utf8'));

exports.readDir = path => fs.readdirSync(path);

exports.isDirectory = path => fs.lstatSync(path).isDirectory();
