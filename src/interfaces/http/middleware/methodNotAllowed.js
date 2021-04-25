import MethodNotAllowedHandler from "interfaces/http/errors/MethodNotAllowed";

export default function methodNotAllowedHandler(req) {
  throw new MethodNotAllowedHandler(
    `http method '${req.method}' for API endpoint (${req.originalUrl}) is not allowed.`
  );
}
