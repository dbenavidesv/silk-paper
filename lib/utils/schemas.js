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

const testsResponsesToDocumentation = (res, description) => {
  const reqHeaders = res.req._headers;
  delete reqHeaders.host;
  delete reqHeaders['accept-encoding'];
  delete reqHeaders['user-agent'];

  const resHeaders = res.headers;
  delete resHeaders['x-powered-by'];

  return ({
    method: res.req.method,
    path: res.req.path,
    description,
    reqHeaders,
    reqBody: res.request.toJSON().data,
    statusCode: res.status,
    resHeaders,
    resBody: res.body
   });
}

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
