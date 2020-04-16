# base-winston-logger
An example of using and setting up Winston multi-logging

The `logger.js` exports a Logger class which, when instantiated, creates three separate logging streams each with their own options.

- logger.log -- basic logger
- logger.requestLog -- requires logger
- logger.sqlLog -- sql logger

This is configured to use the `winston3-logstash-transport` where each of the loggers above can export the logs to a separate logging configuration found in `config.js`

For example on how transports work see -- https://www.npmjs.com/package/winston3-logstash-transport

`loggingReqResp.js` provides example formats of how you might want to log request and response objects. Typically, in Req/Resp logging these are merged into one large JSON blob and sent to the metrics or logging receiver.
