// const isEqual = require('lodash/isEqual');

const { DOCS_DIR, fileTypes } = require('../constants');
const { createSpecification, updateSpecification } = require('../utils/specification');
const { createFile, fileExists, readFile } = require('../utils/files');
const { testsResponsesToDocumentation } = require('../utils/mappers');

exports.genDocs = (request, { description, docsDir = DOCS_DIR, fileType = fileTypes.JSON }) => {
  const data = testsResponsesToDocumentation(request, description);
  const path = `${docsDir}${data.path}`;
  const dirPath = `${process.cwd()}/${path}`;
  const docsPath = `${dirPath}/${data.method}.${fileType}`;

  let spec = {};
  if (fileExists(docsPath)) {
    spec = readFile(docsPath);
    updateSpecification(spec, data);
  } else {
    spec = createSpecification(data);
  }
  createFile(dirPath, docsPath, `${JSON.stringify(spec, undefined, 2)}\n`);
};
