const fs = require('fs');

exports.createFile = (dirPath, filePath, content) => {
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, content);
};
