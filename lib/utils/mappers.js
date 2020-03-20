/* eslint-disable no-underscore-dangle */
const qs = require('querystring');

const { addPrototype } = require('./objects');
const { CONTENT_TYPE, QUERY_SYMBOL } = require('../constants');

const discriminateParamsFromPath = rawPath => {
  // TODO: acoplar a path params, complicada la cosa.
  const [path, querystring] = rawPath.split(QUERY_SYMBOL);
  return { path, queryParams: qs.parse(querystring), pathParams: {} };
};

exports.extractDataFromresponse = (request, description) => {
  const reqHeaders = request.req._headers;
  delete reqHeaders.host;
  delete reqHeaders['accept-encoding'];
  delete reqHeaders['user-agent'];

  const resHeaders = request.headers;
  delete resHeaders['x-powered-by'];
  const resType = resHeaders[CONTENT_TYPE].split(';')[0]; /* TODO: revisar si se necesita el formato */

  return addPrototype({
    method: request.req.method.toLowerCase(),
    description,
    ...discriminateParamsFromPath(request.req.path),
    reqHeaders,
    reqBody: request.request.toJSON().data,
    statusCode: request.status,
    resHeaders,
    resType,
    resBody: request.body
  });
};
