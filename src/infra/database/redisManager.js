const asyncRedis = require("async-redis");
const redis = require("redis");

const redisManager = ({ config, logger }) => {
  logger.info("Connecting to Redis database...");
  const password = config.get("redis.password");
  const isTls = config.get("redis.isTLS");
  const host = config.get("redis.host");
  const port = config.get("redis.port");
  const username = config.get("redis.username");
  const prefix = config.get("redis.prefixKeyName");
  const protocol = isTls ? "rediss://" : "redis://";

  // let redisClient = redis.createClient({
  //   host,
  //   port,
  //   username,
  //   prefix,
  //   password,
  // });
  // if (password) {
  //   redisClient.auth(password, (error) => {
  //     logger.error(error);
  //   });
  // }
  // rediss://default:f0y8f0vrdtpwgeuv@db-redis-youid-do-user-2015149-0.b.db.ondigitalocean.com:25061

  let redisClient = redis.createClient(`${protocol}${username}:${password}@${host}:${port}`, {
    prefix,
  });

  redisClient.debug_mode = true;

  redisClient = asyncRedis.decorate(redisClient);

  redisClient.on("connect", () => {
    logger.info("Connected to Redis");
  });
  redisClient.on("reconnecting", () => {
    logger.info("Redis is reconnecting...");
  });
  redisClient.on("error", (error) => {
    logger.error(error);
  });

  return redisClient;
};

// Releveant documentations - https://www.npmjs.com/package/async-redis
export default redisManager;
