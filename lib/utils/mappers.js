exports.testsResponsesToDocumentation = (request, description) => {
  const reqHeaders = request.req._headers;
  delete reqHeaders.host;
  delete reqHeaders['accept-encoding'];
  delete reqHeaders['user-agent'];

  const resHeaders = request.headers;
  delete resHeaders['x-powered-by'];

  return {
    method: request.req.method,
    path: request.req.path,
    description,
    reqHeaders,
    reqBody: request.request.toJSON().data,
    statusCode: request.status,
    resHeaders,
    resBody: request.body
  };
};
