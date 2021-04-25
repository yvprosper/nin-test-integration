import HttpStatus from "http-status-codes";
import BaseError from "./base";

class TooManyRequestsError extends BaseError {
  constructor(
    message = "Too many requests sent in a given amount of time",
    status = HttpStatus.TOO_MANY_REQUESTS,
    data
  ) {
    super(message, status, data);
    this.name = "TooManyRequestsError";
  }
}

export default TooManyRequestsError;
