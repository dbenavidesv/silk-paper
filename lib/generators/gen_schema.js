const { dataTypes } = require('../constants');

const getObjectType = value => (Array.isArray(value) ? dataTypes.ARRAY : dataTypes.OBJECT);

const getOpenAPIType = value => {
  const jsType = typeof value;

  return (
    {
      string: { type: dataTypes.STRING },
      boolean: { type: dataTypes.BOOLEAN },
      number: { type: dataTypes.NUMBER },
      object: { type: getObjectType(value) }
    }[jsType] || { type: dataTypes.STRING }
  );
};

exports.genOpenApiSchema = struct => {
  const openApiType = getOpenAPIType(struct);
  const { type } = openApiType;

  if (struct && type === dataTypes.OBJECT) {
    const keys = Object.keys(struct);
    return {
      type,
      properties: keys.reduce((schema, key) => {
        schema[key] = exports.genOpenApiSchema(struct[key]);
        return schema;
      }, {})
    };
  } else if (type === dataTypes.ARRAY) {
    return {
      type,
      items: exports.genOpenApiSchema(struct[0])
    };
  }

  return Object.assign(openApiType, {
    example: struct
  });
};
