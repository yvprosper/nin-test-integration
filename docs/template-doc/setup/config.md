# Configurations

The configuration is on the `config/<service>.js` file, here's an example of environment file:

```javascript
const config = {
  httpPort: {
    doc: "The rest port to bind",
    format: "port",
    default: 30007,
    env: "HTTP_PORT",
    sensitive: false,
  },
  grpcPort: {
    doc: "The grpc port to bind",
    format: "port",
    default: 30015,
    env: "GRPC_PORT",
    sensitive: false,
  },
  env: {
    doc: "The application environment",
    format: ["production", "development", "test", "qa", "staging", "local"],
    default: "local",
    env: "NODE_ENV",
    sensitive: false,
  },
};

exports.app = config;
```

This file setups the `httpPort`, `grpcPort`, & `env` for the server. Feel free to add more keys and values to be used across the app. The above config can be access like

```javascript
import config from "config";

const httpPort = config.get("app.httpPort");
const env = config.get("app.env");
const grpcPort = config.get("app.grpcPort");

console.log({ httpPort, env, grpcPort });
```

for more information checkout [Config Docs](https://github.com/mozilla/node-convict)
