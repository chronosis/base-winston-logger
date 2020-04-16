class MockResponse {
  constructor(log, params) {
    this._status = 200;
    this._headers = {};
    this._body = {};
    this.log = log;

    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this[key] = params[key];
        }
      }
    }
  }
  
  set(header, value) {
    this._headers[header] = value;
  }

  status(stat) { 
    if (stat) { 
      this._status = stat; 
    }
   return this._status;
  }

  header(header, value) {
    this._headers[header] = value;
  }

  json(data) {
    this.headersSent = true;
    this.log.info('JSON response sent');
    this.log.info('== HEADERS ==')
    this.log.info(JSON.stringify(this.headers));
    this.log.info('== Body ==')
    this.log.info(JSON.stringify(data));
  }

  send(data) {
    this.headersSent = true;
    this.log.info('JSON response sent');
    this.log.info('== HEADERS ==')
    this.log.info(JSON.stringify(this.headers));
    this.log.info('== Body ==')
    this.log.info(data);
  }
}

module.exports = MockResponse;