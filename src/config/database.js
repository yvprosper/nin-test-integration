const config = {
  auth: {
    doc: "The database host",
    format: Boolean,
    default: true,
    env: "DATABASE_IS_AUTH",
    sensitive: false,
  },
  port: {
    doc: "The database port",
    format: "port",
    default: 27017,
    env: "DATABASE_PORT",
    sensitive: false,
  },
  host: {
    doc: "The database host",
    format: "*",
    default: "localhost",
    env: "DATABASE_HOST",
    sensitive: false,
  },
  name: {
    doc: "The database name",
    format: "*",
    default: "", // add a good default
    env: "DATABASE_NAME",
    sensitive: true,
  },
  user: {
    doc: "The database username",
    format: "*",
    default: "",
    env: "DATABASE_USER",
    sensitive: true,
  },
  password: {
    doc: "The database password",
    format: "*",
    default: "",
    env: "DATABASE_PASSWORD",
    sensitive: true,
  },
};

exports.database = config;
