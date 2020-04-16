# base-winston-logger
An example of using and setting up Winston multi-logging

The `logger.js` exports a Logger class which, when instantiated, creates three separate logging streams each with their own options.

| Type | Logger Property |
|------|-----------------|
| Basic / Application logging | `logger.log` |
| Request logging | `logger.requestLog` |
| SQL/DB logging | `logger.sqlLog` |

By default the Basic logger is set to output to file, console and logstash; while the other two loggers are set to console and the logstash transport, so no files are generated.

The logstash transports are configured to use the `winston3-logstash-transport` module where each of the loggers above can export the logs to a separate logging configuration found in `config.js`

For example on how transports work see -- https://www.npmjs.com/package/winston3-logstash-transport

`loggingReqResp.js` provides example formats of how you might want to log request and response objects. Typically, in Req/Resp logging these are merged into one large JSON blob and sent to the metrics or logging receiver.
