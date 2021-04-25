import HttpStatus from "http-status-codes";
import BaseError from "./base";

class PaymentRequiredError extends BaseError {
  constructor(message = "Payment is required", status = HttpStatus.PAYMENT_REQUIRED, data) {
    super(message, status, data);
    this.name = "PaymentRequiredError";
  }
}

export default PaymentRequiredError;
