import amqp from "amqp-connection-manager";
import config from "config";
// import Logger from "infra/logging/Logger";
// import container from "src/container";

// const { logger, config } = container.cradle;

// const logger = new Logger({ config });
// console.log({ logger: logger.info });
const logger = {
  info: console.info,
  error: console.error,
};
const isTls = config.get("rabbitmq.isTls");
const queuePrefix = config.get("rabbitmq.prefixKeyName");
const connectionOptions = {
  protocol: isTls ? "amqps" : "amqp",
  hostname: config.get("rabbitmq.host"),
  port: config.get("rabbitmq.port"),
  username: config.get("rabbitmq.username"),
  password: config.get("rabbitmq.password"),
  locale: "en_US",
  frameMax: 0,
  heartbeat: 0,
  vhost: config.get("rabbitmq.vhost"),
};
// Create a connetion manager
logger.info("Connecting to RabbitMq...");
const connection = amqp.connect(connectionOptions);
connection.on("connect", () => logger.info("RabbitMq is connected!"));
connection.on("disconnect", () => logger.info("RabbitMq disconnected. Retrying..."));

export const EXCHANGE_NAME = `${queuePrefix}.users.exchange`;
export const USER_QUEUE = `${queuePrefix}.users.queue`;
export const USER_ROUTING_KEY = "users.route";
// Create a channel wrapper
export const channelWrapper = connection.createChannel({
  json: true,
  setup(channel) {
    // `channel` here is a regular amqplib `ConfirmChannel`.
    // assert and bind all your queues here
    return Promise.all([
      channel.assertExchange(EXCHANGE_NAME, "topic", {
        durable: true,
      }),
      channel.assertQueue(USER_QUEUE, { durable: true }),
      channel.bindQueue(USER_QUEUE, EXCHANGE_NAME, USER_ROUTING_KEY),
    ]);
  },
});
channelWrapper.on("connect", () => {
  logger.info("RabbitMq channel has connected");
});

channelWrapper.on("close", () => {
  logger.info("RabbitMq channel has closed");
});
