import HttpStatus from "http-status-codes";
import BaseError from "./base";

class PayloadTooLargeError extends BaseError {
  constructor(
    message = "The request is larger than the server is willing or able to process",
    status = HttpStatus.REQUEST_TOO_LONG,
    data
  ) {
    super(message, status, data);
    this.name = "PayloadTooLargeError";
  }
}

export default PayloadTooLargeError;
