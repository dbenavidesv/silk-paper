const fileTypes = {
  JSON: 'json',
  YAML: 'yml',
  YML: 'yml'
};

const schemaTypes = {
  RESPONSE: 'response',
  REQUEST: 'request'
};

const paramTypes = {
  QUERY: 'query',
  PATH: 'path',
  HEADERS: 'headers',
  // TODO: not implemented logic for cookies
  COOKIES: 'cookies'
};

const dataTypes = {
  STRING: 'string',
  BOOLEAN: 'boolean',
  NUMBER: 'number',
  OBJECT: 'object',
  ARRAY: 'array'
};

const DEFAULT_DOCS_DIR = 'docs_open';
const DEFAULT_OPEN_API = '3.0.0';
const DEFAULT_TEST_SUIT = 'supertest';
const PACKAGE_JSON = 'package.json';
const EXAMPLE_SERVER_URL = 'http://api.example.com/v1';
const EXAMPLE_SERVER_DESCRIPTION =
  'To see examples on how to set servers, please refer to https://swagger.io/docs/specification/api-host-and-base-path';
const COMP_SCHEMAS_PATH = 'components.schemas';
const JSON_CONTENT_TYPE_PATH = 'content.application/json';
const CONTENT_TYPE = 'content-type';

const QUERY_SYMBOL = '?';
const SLASH_SYMBOL = '/';

module.exports = {
  fileTypes,
  paramTypes,
  schemaTypes,
  dataTypes,
  DEFAULT_DOCS_DIR,
  DEFAULT_OPEN_API,
  DEFAULT_TEST_SUIT,
  PACKAGE_JSON,
  EXAMPLE_SERVER_URL,
  EXAMPLE_SERVER_DESCRIPTION,
  COMP_SCHEMAS_PATH,
  JSON_CONTENT_TYPE_PATH,
  CONTENT_TYPE,
  QUERY_SYMBOL,
  SLASH_SYMBOL
};
