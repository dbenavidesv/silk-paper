const fs = require('fs');

const { SLASH_SYMBOL } = require('../constants');

const createFile = (path, content) => {
  const pathList = path.split(SLASH_SYMBOL);
  pathList.pop();
  const dir = pathList.join(SLASH_SYMBOL);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path, content);
};

const fileExists = path => fs.existsSync(path);

const readFile = path =>
  // TODO: Read extension
  // It's only for json objects for now
  JSON.parse(fs.readFileSync(path, 'utf8'));

module.exports = {
  createFile,
  fileExists,
  readFile
};
