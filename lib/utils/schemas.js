const OBJECT_TYPE = 'object';
const ARRAY_TYPE = 'array';

const getObjectType = value => (Array.isArray(value) ? ARRAY_TYPE : OBJECT_TYPE);

const getOpenAPIType = value => {
  const jsType = typeof value;

  return (
    {
      string: { type: 'string' },
      boolean: { type: 'boolean' },
      number: { type: 'number' },
      object: { type: getObjectType(value) }
    }[jsType] || { type: 'string' }
  );
};

exports.toOpenApiSchema = struct => {
  const openApiType = getOpenAPIType(struct);
  const { type } = openApiType;

  if (struct && type === OBJECT_TYPE) {
    const keys = Object.keys(struct);
    return {
      type,
      properties: keys.reduce((schema, key) => {
        schema[key] = exports.toOpenApiSchema(struct[key]);
        return schema;
      }, {})
    };
  } else if (type === ARRAY_TYPE) {
    return {
      type,
      items: exports.toOpenApiSchema(struct[0])
    };
  }

  return Object.assign(openApiType, {
    example: struct
  });
};

const exampleResponse = {
  data: {
    users: [
      {
        id: 1,
        name: 'Daniel'
      }
    ]
  },
  code: 200
};

// console.log(JSON.stringify(exports.toOpenApiSchema(exampleResponse)));
