import { Client } from "@elastic/elasticsearch";

const elasticsearchManager = ({ config, logger }) => {
  logger.info("Connecting to Elasticsearch database...");

  const elasticClient = new Client({
    node: {
      url: new URL(`${config.get("elasticsearch.host")}:${config.get("elasticsearch.port")}`),
    },
    auth: {
      username: config.get("elasticsearch.username"),
      password: config.get("elasticsearch.password"),
    },
    ssl: {
      rejectUnauthorized: false,
    },
    log: "trace",
    maxRetries: 3,
    requestTimeout: 60000,
    sniffOnStart: false,
  });

  return elasticClient;
};

// Releveant documentations
// https://www.npmjs.com/package/@elastic/elasticsearch
// https://github.com/sudo-suhas/elastic-builder

export default elasticsearchManager;
