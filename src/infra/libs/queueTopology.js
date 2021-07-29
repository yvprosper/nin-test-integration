import config from "config";

export const queueTopology = (worker) => {
  const queuePrefix = config.get("rabbitmq.prefixKeyName");
  const exchange = `${queuePrefix}.exchange`;
  let topology;
  switch (worker) {
    case "test":
      topology = {
        queue: `${queuePrefix}.queue`,
        exchange,
        routingKey: `${queuePrefix}.route`,
      };
      break;

    default:
      throw new Error("Invalid queue: Something bad happened!");
  }

  return topology;
};

export const RETRY_EXCHANGE_NAME = "retry.exchange";
