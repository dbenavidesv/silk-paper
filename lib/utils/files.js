const fs = require('fs');

const createFile = (dirPath, filePath, content) => {
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, content);
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
