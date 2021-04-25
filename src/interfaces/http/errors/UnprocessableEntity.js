import HttpStatus from "http-status-codes";
import BaseError from "./base";

class UnprocessableEntityError extends BaseError {
  constructor(
    message = "The request was well-formed but was unable to be followed due to semantic errors",
    status = HttpStatus.UNPROCESSABLE_ENTITY,
    data
  ) {
    super(message, status, data);
    this.name = "UnprocessableEntityError";
  }
}

export default UnprocessableEntityError;
