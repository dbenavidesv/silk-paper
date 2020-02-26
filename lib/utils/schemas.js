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

const toOpenApiSchema = struct => {
  const openApiType = getOpenAPIType(struct);
  const { type } = openApiType;

  if (type === OBJECT_TYPE) {
    const keys = Object.keys(struct);
    return {
      type,
      properties: keys.reduce((schema, key) => {
        schema[key] = toOpenApiSchema(struct[key]);
        return schema;
      }, {})
    };
  } else if (type === ARRAY_TYPE) {
    return {
      type,
      items: toOpenApiSchema(struct[0])
    };
  }
  return {
    ...openApiType,
    example: struct
  };
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

console.log(JSON.stringify(toOpenApiSchema(exampleResponse)));
