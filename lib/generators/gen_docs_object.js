/* eslint-disable no-negated-condition */
const { readFile, readDir, isDirectory } = require('../utils/files');
const { addSchemas } = require('../../lib/utils/schemas');

const requireAllDocFiles = (pathToSearch, specification, fileType) => {
  readDir(pathToSearch).forEach(file => {
    if (!isDirectory(`${pathToSearch}/${file}`)) {
      if (file !== `specification.${fileType}`) {
        const docFile = readFile(`${pathToSearch}/${file}`);
        specification.paths[`${Object.keys(docFile)[0]}`] = Object.values(docFile)[0];
        specification.components.schemas = addSchemas(
          specification.components.schemas,
          Object.values(docFile)[1].schemas
        );
      }
    } else {
      requireAllDocFiles(`${pathToSearch}/${file}`, specification, fileType);
    }
  });

  return specification;
};

exports.generateDocumentationObject = options => {
  const specPath = `${process.cwd()}/${options.docsDir}/specification.${options.fileType}`;
  const specification = readFile(specPath);

  specification.paths = {};
  specification.components = {
    schemas: {}
  };

  // including all documentation files
  const normalizedPath = `${process.cwd()}/${options.docsDir}`;

  return requireAllDocFiles(normalizedPath, specification, options.fileType);
};
