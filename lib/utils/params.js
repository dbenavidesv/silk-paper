const { set } = require('./objects');
const { genOpenApiSchema } = require('../generators/gen_schema');
const { paramTypes } = require('../constants');

const addParams = (spec, data, params = {}, type) => {
  const paramsPath = `${data.path}.${data.method}.parameters`;
  Object.keys(params).forEach(name => {
    set(spec, paramsPath, paramsList => {
      const existingParam = paramsList.find(param => param.name === name && param.in === type);
      if (existingParam) {
        return paramsList;
      }
      paramsList.push({
        in: type,
        name,
        required: false,
        schema: genOpenApiSchema(params[name])
      });
      return paramsList;
    });
  });
};

const checkAndAddParameters = (spec, data) => {
  addParams(spec, data, data.queryParams, paramTypes.QUERY);
  addParams(spec, data, data.pathParams, paramTypes.PATH);
  addParams(spec, data, data.reqHeaders, paramTypes.HEADERS);
};

module.exports = {
  checkAndAddParameters
};
