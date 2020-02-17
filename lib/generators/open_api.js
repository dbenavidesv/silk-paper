const { createFile } = require('../utils/files')

const DOCS_DIR = 'swagger_docs';
const FILE_TYPE = 'yml';

const gendocs = request => {
  console.log(request.req.path);
  createFile(
    `${DOCS_DIR}${request.req.path}`,
    `${request.req.method}.${FILE_TYPE}`,
    '{\n\t"hola": "Hola"\n}'
  );
};