import express from "express";
import http from "http";
import path from "path";

class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.disable("x-powered-by");
    this.express.use(
      "/rest-api",
      express.static(path.resolve(__dirname, "../../../docs/restdocs"))
    );
    this.express.use("/readme", express.static(path.resolve(__dirname, "../../../docs/readme")));

    this.express.use(router);
    this.express.app = http.createServer(this.express);
  }

  start() {
    return new Promise((resolve) => {
      const server = this.express.app.listen(this.config.get("app.httpPort"), () => {
        const { port } = server.address();
        this.logger.info(`[pid ${process.pid}] REST server Listening on port ${port}`);
        return resolve(this.express.server);
      });
    });
  }
}

module.exports = Server;
