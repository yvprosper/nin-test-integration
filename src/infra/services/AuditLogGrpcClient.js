import grpc from "grpc";
import { createPublishEventRequest } from "interfaces/grpc/requests";
import ClientServices from "stubs/auditlog/service_grpc_pb";

const opentracing = require("opentracing");

/**
 * class AuditLogGrpcClient
 */
class AuditLogGrpcClient {
  constructor({ config, tracing: { tracer, logSpanError }, userAgent, ipAddress, currentUser }) {
    this.config = config;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.hostport = this.config.get("app.auditLogGrpcHostPort");
    this.client = new ClientServices.AuditLogAPIClient(
      this.hostport,
      grpc.credentials.createInsecure()
    );
    this.userAgent = userAgent;
    this.ipAddress = ipAddress;
    this.currentUser = currentUser;
  }

  /**
   * log an audit
   * @param {*} payload
   * @param {*} span
   * @returns {Promise}
   *
   */
  async publishEvent(payload, span) {
    return new Promise((resolve, reject) => {
      try {
        const eventPayload = Object.assign(payload, {
          deviceInfo: {
            browser: this.userAgent.browser,
            os: this.userAgent.os,
            version: this.userAgent.version,
          },
          ipAddress: this.ipAddress,
          businessId: this.currentUser.businessId,
          businessType: this.currentUser.businessType,
          userId: this.currentUser._id,
        });
        const traceContext = {};
        this.tracer.inject(span, opentracing.FORMAT_TEXT_MAP, traceContext);
        const metadata = new grpc.Metadata();
        metadata.add("trace", JSON.stringify(traceContext));
        const request = createPublishEventRequest(eventPayload);
        this.client.publishEvent(request, metadata, (error, response) => {
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
