const config = {
  grpcHostPort: {
    doc: "Auth service grpc hstport",
    format: "*",
    default: null,
    env: "AUTH_SERVICE_GRPC_HOSTPORT",
    sensitive: true,
  },
};

exports.auth = config;
