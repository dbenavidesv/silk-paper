const { set } = require('./objects');
const { getPathByType, createDescription, generateSchemaName } = require('./data');
const { schemaTypes, COMP_SCHEMAS_PATH, JSON_CONTENT_TYPE_PATH } = require('../constants');
const { generateOpenApiSchema } = require('../generators/gen_schema');

const getBodyObject = (data, type) =>
  ({
    [schemaTypes.REQUEST]: data.reqBody,
    [schemaTypes.RESPONSE]: data.resBody
  }[type]);

const getSchemas = (schemas, schemaName) => {
  const nameRegex = new RegExp(`^${schemaName}[0-9]+$`);
  const schemaNames = Object.keys(schemas).filter(name => nameRegex.test(name));
  return schemaNames.reduce((filteredSchemas, name) => {
    filteredSchemas.push({ [name]: schemas[name] });
    return filteredSchemas;
  }, []);
};

const addSchema = ({ spec, data, schema, name, type }) => {
  const schemaPath = getPathByType(data, type);
  set(spec, `${COMP_SCHEMAS_PATH}.${name}`, schema);
  set(spec, `${schemaPath}.description`, createDescription(data));
  set(spec, `${schemaPath}.${JSON_CONTENT_TYPE_PATH}.schema.oneOf`, (oneOf = []) => {
    oneOf.push({ $ref: `#/components/schemas/${name}` });
    return oneOf;
  });
};

const compareContent = () => true;

const checkAndAddSchema = ({ spec, data, schema, name, type }) => {
  const schemas = getSchemas(spec.components.schemas, name);
  const indexedName = `${name}${schemas.length}`;
  if (schemas.length > 0) {
    schemas.forEach(existingSchema => {
      // TODO: missing logic
      compareContent(existingSchema, schema);
    });
  } else {
    addSchema({ spec, data, schema, name: indexedName, type });
  }
};

exports.generateAndAddBodychema = (spec, data, type) => {
  const body = getBodyObject(data, type);
  if (body) {
    const schema = generateOpenApiSchema(body);
    const name = generateSchemaName(data, type);
    checkAndAddSchema({ spec, data, schema, name, type });
  }
};
