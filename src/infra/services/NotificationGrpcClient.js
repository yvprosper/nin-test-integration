import grpc from "grpc";
import { createQueueEmailRequest, createQueueSmsRequest } from "interfaces/grpc/requests";
import ClientServices from "stubs/notification/service_grpc_pb";

const opentracing = require("opentracing");

/**
 * class NotificationGrpcClient
 */
class NotificationGrpcClient {
  constructor({ config, tracing: { tracer, logSpanError } }) {
    this.config = config;
    this.tracer = tracer;
    this.logSpanError = logSpanError;
    this.hostport = this.config.get("app.notificationGrpcHostPort");
    this.client = new ClientServices.NotificationAPIClient(
      this.hostport,
      grpc.credentials.createInsecure()
    );
  }

  /**
   * queue email
   * @param {*} payload
   * @param {*} span
   * @returns {Promise}
   *
   */
  async queueEmail(payload, span) {
    return new Promise((resolve, reject) => {
      try {
        console.log({ hostport: this.hostport });
        const traceContext = {};
        this.tracer.inject(span, opentracing.FORMAT_TEXT_MAP, traceContext);
        const metadata = new grpc.Metadata();
        metadata.add("trace", JSON.stringify(traceContext));
        const request = createQueueEmailRequest(payload);
        this.client.queueEmail(request, metadata, (error, response) => {
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

  /**
   * queue SMS
   * @param {*} payload
   * @param {*} span
   * @returns {Promise}
   *
   */
  async queueSms(payload, span) {
    return new Promise((resolve, reject) => {
      try {
        console.log({ hostport: this.hostport });
        const traceContext = {};
        this.tracer.inject(span, opentracing.FORMAT_TEXT_MAP, traceContext);
        const metadata = new grpc.Metadata();
        metadata.add("trace", JSON.stringify(traceContext));
        const request = createQueueSmsRequest(payload);
        this.client.queueSms(request, metadata, (error, response) => {
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

export default NotificationGrpcClient;
