// import opentracing from "opentracing";
import config from "config";

const opentracing = require("opentracing");

const initJaegerTracer = require("jaeger-client").initTracer;

const initTracer = (serviceName = config.get("app.serviceName")) => {
  const env = config.get("app.env");
  const isLocalEnv = env === "local";

  // Sampler set to const 1 to capture every request, do not do this for production
  const configuration = {
    serviceName,
    reporter: {
      logSpans: isLocalEnv,
    },
  };
  const options = {
    tags: {
      [`${serviceName}.version`]: config.get("app.apiVersion"),
    },
    logger: isLocalEnv ? console : null,
  };
  // Only for DEV the sampler will report every span

  configuration.sampler = { type: "const", param: 1 };
  if (!isLocalEnv) {
    configuration.sampler = { type: "probabilistic", param: 0.9 };
  }

  return initJaegerTracer(configuration, options);
};

const tracer = initTracer();
/**
 *
 * @param {*} span
 * @param {*} error
 */
const logSpanError = (span, error) => {
  // error && !error.isOperationalError
  if (error) {
    span.setTag(opentracing.Tags.ERROR, true);
    span.setTag("error_name", error.name);
    span.log({ event: "error", message: { ...error, stack: error.stack } });
  }
};

const traceMongoQuery = async (parentSpan, traceName, documentQuery) => {
  const traceSpan = tracer.startSpan(traceName, {
    childOf: parentSpan,
    tags: {
      [opentracing.Tags.SPAN_KIND]: opentracing.Tags.SPAN_KIND_RPC_SERVER,
      [opentracing.Tags.COMPONENT]: "mongodb",
    },
  });
  const documentResult = await documentQuery;
  traceSpan.finish();
  return documentResult;
};

const tracing = {
  tracer,
  logSpanError,
  traceMongoQuery,
  opentracing,
};

export default tracing;
