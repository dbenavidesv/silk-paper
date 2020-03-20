exports.createDescription = data => `${data.method} ${data.path}`;

exports.getPathByType = (data, type) =>
  ({
    response: `${data.path}.${data.method}.responses.${data.statusCode}`,
    request: `${data.path}.${data.method}.requestBody`
  }[type]);

const pathToCamelCase = path => path.replace(/\/[a-z]/gi, idx => idx.replace('/', '').toUpperCase());

exports.generateSchemaName = (data, type) => `${pathToCamelCase(data.path)}${data.statusCode}_${type}`;
