// Documentation - https://github.com/axios/axios#instance-methods
// eslint-disable-next-line max-classes-per-file
import axios from "axios";
import tracing from "infra/tracer/tracer";

class HttpError extends Error {
  constructor(axiosErrorResponse) {
    // Calling parent constructor of base Error class.
    const { status, statusText, headers, config, data } = axiosErrorResponse;

    super(data.message || "Something happened");

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.name = "HttpError";
    // Custom debugging information
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.config = config;
    this.data = data;
  }
}

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
    if (typeof headers === "object" && headers !== null) {
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
        return Promise.reject(new HttpError(error.response));
      }
    );
    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(new HttpError(error.response));
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
