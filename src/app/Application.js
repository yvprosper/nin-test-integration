import GrpcServer from "interfaces/grpc/Server";

class Application {
  constructor({ restServer, database, logger, config }) {
    const grpcServer = new GrpcServer({ logger, config });
    this.restServer = restServer;
    this.grpcServer = grpcServer;
    this.database = database;
  }

  async start() {
    if (this.database) {
      await this.database.connect();
    }
    await this.restServer.start();
    await this.grpcServer.start();
  }
}

export default Application;
