// DOc - https://github.com/axios/axios#instance-methods
import axios from "axios";
import tracing from "infra/tracer/tracer";

class HttpRequest {
  constructor(options = {}) {
    const requestOptions = {
      baseURL: options.baseURL,
      timeout: options.timeout || 300000, // 5 mins
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };
    this.axios = axios;
    this.requestOptions = requestOptions;
  }

  /**
   *
   * @param {Object} span
   * @returns this
   * @memberof HttpRequest
   */
  setSpan(span) {
    if (span) {
      const headers = {};
      const { tracer, opentracing } = tracing;
      // inject trace into headers
      tracer.inject(span, opentracing.FORMAT_HTTP_HEADERS, headers);
      // add trace header to provided headers
      this.requestOptions.headers = Object.assign(this.requestOptions.headers, headers);
    }

    return this;
  }

  /**
   *
   * @param {Object} headers
   * @returns this
   * @memberof HttpRequest
   */
  addHeaders(headers) {
    if (typeof headers === "object") {
      // add header to provided headers
      this.requestOptions.headers = Object.assign(this.requestOptions.headers, headers);
    }

    return this;
  }

  get request() {
    const instance = this.axios.create(this.requestOptions);

    // Add a request interceptor
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );

    return instance;
  }

  getCancelToken() {
    const { CancelToken } = this.axios;
    return CancelToken;
  }
}

export default HttpRequest;
