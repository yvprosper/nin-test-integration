import grpc from "grpc";
import { createLogEventRequest } from "interfaces/grpc/requests";
import ClientServices from "stubs/auditlog/service_grpc_pb";

const opentracing = require("opentracing");

/**
 * class AuditLogGrpcClient
 */
class AuditLogGrpcClient {
  constructor({ config, tracing: { tracer, logSpanError } }) {
    this.config = config;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.hostport = this.config.get("app.auditLogGrpcHostPort");
    this.client = new ClientServices.AuditLogAPIClient(
      this.hostport,
      grpc.credentials.createInsecure()
    );
  }

  /**
   * log an audit
   * @param {*} payload
   * @param {*} span
   * @returns {Promise}
   *
   */
  async logEvent(payload, span) {
    return new Promise((resolve, reject) => {
      try {
        const traceContext = {};
        this.tracer.inject(span, opentracing.FORMAT_TEXT_MAP, traceContext);
        const metadata = new grpc.Metadata();
        metadata.add("trace", JSON.stringify(traceContext));
        const request = createLogEventRequest(payload);
        this.client.logEvent(request, metadata, (error, response) => {
          if (error) {
            reject(error);
            return;
          }
          const { success, response: data } = response.toObject();
          resolve({ success, response: JSON.parse(data) });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuditLogGrpcClient;
