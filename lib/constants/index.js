const fileTypes = {
  JSON: 'json',
  YAML: 'yml'
};

const schemaTypes = {
  RESPONSE: 'response',
  REQUEST: 'request'
};

const paramTypes = {
  QUERY: 'query',
  PATH: 'path',
  HEADERS: 'headers',
  COOKIES: 'cookies'
};

const dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
  ARRAY: 'array'
};

const DOCS_DIR = 'docs_open';
const COMP_SCHEMAS_PATH = 'components.schemas';
const JSON_CONTENT_TYPE_PATH = 'content.application/json';
const CONTENT_TYPE = 'content-type';
const QUERY_SYMBOL = '?';

module.exports = {
  fileTypes,
  paramTypes,
  schemaTypes,
  dataTypes,
  DOCS_DIR,
  COMP_SCHEMAS_PATH,
  JSON_CONTENT_TYPE_PATH,
  CONTENT_TYPE,
  QUERY_SYMBOL
};
