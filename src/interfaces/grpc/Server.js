import Mali from "mali";
import { asValue } from "awilix";
import services from "stubs/todo/service_grpc_pb";

import { getATodo } from "./services";
import { grpcLogger, ipAddress, container } from "./middlewares";

/**
 *
 *
 * @class Server
 */
class Server {
  constructor({ config, logger }) {
    this.logger = logger;
    this.config = config;
  }

  /**
   *
   * @memberof Server
   */
  async start() {
    const app = new Mali(services, "TodoAPI");
    const self = this;
    app.on("error", (error, ctx) => {
      const newError = error;
      newError.method = ctx.name;
      newError.methodType = ctx.type;
      console.log("\n START OF GRPC_ERROR \n---------------");
      console.log(error);
      self.logger.error(newError);
      console.log("-------------\n END OF GRPC_ERROR \n");
    });
    // const { getATodo } = this;
    // register middlewares
    app.use(container);
    app.use(ipAddress); // This middleware is not workinng as intended - fix required TODO:
    app.use(grpcLogger);
    // this middleware is to make sure all attributes on the grpc container is consistent with http interface
    app.use(async (ctx, next) => {
      const userAgent = {
        browser: ctx.get("user-agent"),
        source: ctx.get("user-agent"),
      };
      ctx.container.register({
        currentUser: asValue({}), // User will be added from auth middleware...
        userAgent: asValue(userAgent), // No user agent will be needed for gRPC
      });
      await next();
    });
    // register application methods
    app.use({ getATodo });
    // start application
    const port = this.config.get("app.grpcPort");
    await app.start(`0.0.0.0:${port}`);
    this.logger.info(`[pid ${process.pid}] GRPC server Listening on port ${port}`);
  }
}

export default Server;
