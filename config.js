module.exports = {
  debug: true,
  logging: {
    // Logging Configuration
    logDir: './logs',
    options: { json: false, maxsize: '10000000', maxFiles: '10', level: 'silly', exitOnError: false },
    verbose: true
  },
  logstash: { host: 'localhost', port: 5025, appName: 'app-local', mode: 'udp4' },
  logstashRequests: { host: 'localhost', port: 5075, appName: 'requests-local', mode: 'tcp4' },
  logstashSQL: { host: 'localhost', port: 5100, appName: 'sql-local', mode: 'tcp4' }
};
