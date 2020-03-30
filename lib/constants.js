exports.fileTypes = {
  JSON: 'json',
  YAML: 'yml',
  YML: 'yml'
};

exports.schemaTypes = {
  RESPONSE: 'response',
  REQUEST: 'request'
};

exports.paramTypes = {
  QUERY: 'query',
  PATH: 'path',
  HEADERS: 'headers',
  // TODO: not implemented logic for cookies
  COOKIES: 'cookies'
};

exports.dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
  ARRAY: 'array'
};

exports.DEFAULT_DOCS_DIR = 'docs_open';
exports.DEFAULT_OPEN_API = '3.0.0';
exports.DEFAULT_TEST_SUIT = 'supertest';
exports.PACKAGE_JSON = 'package.json';
exports.EXAMPLE_SERVER_URL = 'http://api.example.com/v1';
exports.EXAMPLE_SERVER_DESCRIPTION =
  'To see examples on how to set servers, please refer to https://swagger.io/docs/specification/api-host-and-base-path';
exports.COMP_SCHEMAS_PATH = 'components.schemas';
exports.JSON_CONTENT_TYPE_PATH = 'content.application/json';
exports.CONTENT_TYPE = 'content-type';
exports.SPECIFICATION = 'specification';

exports.QUERY_SYMBOL = '?';
exports.SLASH_SYMBOL = '/';
