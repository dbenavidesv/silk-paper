/* eslint-disable no-negated-condition */
const { readFile, readDir, isDirectory } = require('../utils/files');
const { addSchemas } = require('../../lib/utils/schemas');
const { SPECIFICATION, COMP_SCHEMAS_PATH } = require('../constants');
const { set } = require('../utils/objects');

const requireAllDocFiles = (specification, pathToSearch, fileType) => {
  readDir(pathToSearch).forEach(file => {
    if (!isDirectory(`${pathToSearch}/${file}`)) {
      if (file !== `${SPECIFICATION}.${fileType}`) {
        const docFile = readFile(`${pathToSearch}/${file}`);
        set(specification, `paths.${Object.keys(docFile)[0]}`, Object.values(docFile)[0]);
        set(
          specification,
          COMP_SCHEMAS_PATH,
          addSchemas(specification.components.schemas, Object.values(docFile)[1].schemas)
        );
      }
    } else {
      requireAllDocFiles(specification, `${pathToSearch}/${file}`, fileType);
    }
  });
};

exports.constructDocumentationObject = options => {
  const specPath = `${process.cwd()}/${options.docsDir}/${SPECIFICATION}.${options.fileType}`;
  const specification = readFile(specPath);

  specification.components = {
    schemas: {}
  };

  // including all documentation files
  const normalizedPath = `${process.cwd()}/${options.docsDir}`;

  requireAllDocFiles(specification, normalizedPath, options.fileType);

  return specification;
};
