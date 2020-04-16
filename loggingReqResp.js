const uuidv4 = require('uuid/v4');
const moment = require('moment');
const x2js = require('x2js');
const __ = require('lodash');
const hostname = require('os').hostname();
const url = require('url');

function attachReqDetails(req, next) {
  // Generate CallID attach to the request object
  const now = moment();
  req.callID = uuidv4();
  req.time = `${now.format()}Z`;
  req.timestamp = now.format('x');
  req.oshost = hostname;
  req.urlpath = url.parse(req.url).pathname;
  req.hasData = false;
  req.hasError = false;
  req.timedout = false;
  next();
}

function logResponse(logger, req, res, next) {
  if (!res.headersSent) {
    for (const header in res.locals.headers) {
      if (Object.prototype.hasOwnProperty(res.locals.headers, header)) {
        res.header(header, res.locals.headers[header]);
      }
    }
    res.status(res.locals.status);
    let bodyData = __.omit(res.locals.body, ['cacheExpiration']);
    switch (req.outputMode) {
      case 'xml': {
        res.set('Content-Type', 'application/xml');
        const x2js = new X2JS();
        const xml = x2js.js2xml(bodyData);
        res.send(`<xml>\n${xml}\n</xml>`);
        break;
      }
      case 'raw': {
        bodyData = req.data;
        res.set('Content-Type', 'application/json');
        res.json(bodyData);
        break;
      }
      case 'json':
      default: {
        res.set('Content-Type', 'application/json');
        res.json(bodyData);
        break;
      }
    }

    const code = req.respCode || 200000;
    if (code === 200000) {
      const respMsg = {
        mode: req.outputMode,
        status: res.locals.status,
        respCode: code,
        protocol: req.secure ? 'HTTPS' : 'HTTP',
        method: req.method,
        endpoint: req.urlpath,
        actualIP: req.connection.remoteAddress,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        callID: req.callID,
        server: req.oshost,
        apiKey: req.apiKey,
        secret: req.hasSecret,
        params: req.locals,
        headers: req.headers,
        // performance: { response: req.timers.response, route: req.timers.route, respCache: req.timers.respCache },
        // cache: { response: { needs: req.needsCache, used: req.usedCache, key: req.cacheKey } },
        body: JSON.stringify(bodyData)
      };
      // Separate Logging to request log in logger.js
      logger.requestsLog.info(respMsg);
    }
  }
  next();
}

function logErrResponse(logger, err, req, res, next) {
  logger.log.debug('Error Handler');
  // RequestTimer.stopTimers(req, 'route', 'response', 'responseCache');
  // this.setError(err, req, res);
  const errorMsg = {
    mode: req.outputMode,
    status: res.locals.status,
    respCode: req.respCode || 200000,
    protocol: req.secure ? 'HTTPS' : 'HTTP',
    method: req.method,
    endpoint: req.urlpath,
    actualIP: req.connection.remoteAddress,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    callID: req.callID,
    server: req.oshost,
    apiKey: req.apiKey,
    secret: req.hasSecret,
    params: req.locals,
    headers: req.headers,
    // performance: { response: req.timers.response, route: req.timers.route, respCache: req.timers.respCache },
    // cache: { response: { needs: req.needsCache, used: req.usedCache, key: req.cacheKey } },
    error: err
  };
  // Separate Logging to request log in logger.js
  logger.requestLog.error(errorMsg);
  next();
}

module.exports = {
  attachReqDetails,
  logResponse,
  logErrResponse
}