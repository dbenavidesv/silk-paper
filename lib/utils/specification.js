const { createDescription } = require('./data');
const { generateAndAddBodychema } = require('./schemas');
const { checkAndAddParameters } = require('./params');
const { schemaTypes } = require('../constants');

exports.initSpecification = data => ({
  [data.path]: {
    [data.method]: {
      description: createDescription(data),
      produces: data.resType,
      parameters: []
    }
  },
  components: { schemas: {} }
});

exports.createSpecification = data => {
  const spec = this.initSpecification(data);

  generateAndAddBodychema(spec, data, schemaTypes.REQUEST);
  generateAndAddBodychema(spec, data, schemaTypes.RESPONSE);
  checkAndAddParameters(spec, data);

  return spec;
};

exports.updateSpecification = (spec, data) => {
  generateAndAddBodychema(spec, data, schemaTypes.REQUEST);
  generateAndAddBodychema(spec, data, schemaTypes.RESPONSE);
  checkAndAddParameters(spec, data);
};
