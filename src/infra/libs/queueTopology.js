export const queueTopology = (worker, config) => {
  const queuePrefix = config.get("rabbitmq.prefixKeyName");
  const exchange = `${queuePrefix}.test.exchange`;
  let topology;
  switch (worker) {
    case "test":
      topology = {
        queue: `${queuePrefix}.test.queue`,
        exchange,
        routingKey: "test.send",
      };
      break;

    default:
      throw new Error("Invalid queue: Something bad happened!");
  }

  return topology;
};

export const RETRY_EXCHANGE_NAME = "retry.exchange";
