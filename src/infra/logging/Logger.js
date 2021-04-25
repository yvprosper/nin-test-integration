const FluentLogger = require("fluent-logger");

class Logger {
  constructor({ config }) {
    // console.log({ configFromLogger: config });
    this.config = config;
    this.TAG = "log";
    this.defaultMessage = {
      service: { name: this.config.get("app.serviceName") },
    };
    this.connect();
  }

  connect() {
    // console.log({
    //   serviceName: this.config.get("app.serviceName"),
    //   host: this.config.get("fluentd.host"),
    //   port: this.config.get("fluentd.port"),
    //   sharedKey: this.config.get("fluentd.sharedKey"),
    // });
    FluentLogger.configure(this.config.get("app.serviceName"), {
      host: this.config.get("fluentd.host"),
      port: this.config.get("fluentd.port"),
      timeout: 3.0,
      reconnectInterval: 300000, // 5 minutes
      security: {
        clientHostname: "client.local",
        sharedKey: this.config.get("fluentd.sharedKey"),
      },
    });
  }

  error(error) {
    try {
      let logMessage;
      if (error instanceof Error) {
        logMessage = {
          message: error.message || (error.error && error.error.toString()) || "Unknown Error",
          status: error.status || -1,
          code: error.code || error.status || -1,
          errorName: error.name || error.error.name,
          isOperationalError: error.isOperationalError || false,
          method: error.method || "none",
          errorType: error.errorType || "HTTP",
          methodType: error.methodType || "none",
        };
      } else {
        logMessage = {
          message: error,
          errorName: "UnknownError",
          status: -1,
        };
      }

      FluentLogger.emit(this.TAG, {
        ...logMessage,
        ...this.defaultMessage,
        level: "ERROR",
        ...{
          stackTrace: error instanceof Error && !error.isOperationalError ? error.stack : "none",
        },
      });
    } catch (err) {
      this.failSilently(err);
    }
  }

  info(message) {
    try {
      let logMessage = {};
      if (!(message instanceof Object)) {
        logMessage = {
          message,
        };
      }
      console.log(logMessage);
      FluentLogger.emit(this.TAG, { ...logMessage, ...this.defaultMessage, level: "INFO" });
    } catch (err) {
      this.failSilently(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  failSilently(error) {
    console.error({ loggerSilentError: error });
  }
}

export default Logger;
