import HttpStatus from "http-status-codes";
import BaseError from "./base";

class RequestTimeoutError extends BaseError {
  constructor(
    message = "The server timed out waiting for the request",
    status = HttpStatus.REQUEST_TIMEOUT,
    data
  ) {
    super(message, status, data);
    this.name = "RequestTimeoutError";
  }
}

export default RequestTimeoutError;
