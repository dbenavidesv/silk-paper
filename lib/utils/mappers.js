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
