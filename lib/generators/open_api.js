const { createFile } = require('../utils/files');
const { toOpenApiSchema } = require('../utils/schemas');

const DOCS_DIR = 'swagger_docs';
const FILE_TYPE = 'json';

exports.gendocs = request => {
  console.log(request.req.path);
  const data = toOpenApiSchema(request.body);

  createFile(`${DOCS_DIR}${request.req.path}`, `${request.req.method}.${FILE_TYPE}`, JSON.stringify(data));
  console.log('file created successfully');
};
