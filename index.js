const config = require('./config');
const Logger = require('./logger');
const reqResLogger = require('./loggingReqResp');
const MockResponse = require('./mockResponse');

const logger = new Logger(config);
const log = logger.log;

log.silly('silly');
log.debug('debug');
log.info('info');
log.warn('warn');
log.error('error');

const mockRequest = {
  locals: {
    cacheExpiration: 300000,
  },
  data: {
    body: 'lorem ipsum...'
  },
  headers: {
    'x-forwarded-for': null
  },
  apiKey: 'xxxxxxxx',
  hasSecret: false,
  url: 'http://127.0.0.1/test',
  outputMode: 'json',
  respCode: 200000,
  method: 'GET',
  connection: {
    remoteAddress: '127.0.0.1',
  }
};

const mockResponseParams = {
  headersSent: false,
  locals: {
    status: 200,
    headers: {
      'powered-by': 'nothing'
    },
    body: {}
  },
  body: ''
};

const mockResponse = new MockResponse(log, mockResponseParams);
reqResLogger.attachReqDetails(mockRequest, () => {});
reqResLogger.logResponse(logger, mockRequest, mockResponse, () => {
  log.info('done');
});

log.info('complete');
process.exit(0);