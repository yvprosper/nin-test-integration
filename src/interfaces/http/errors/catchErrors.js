import tracingMiddleware from "interfaces/http/middleware/tracing";

const catchErrors = (controllerMethod) => {
  // eslint-disable-next-line func-names
  return function (req, res, next) {
    return tracingMiddleware(req, res, next, controllerMethod);
    // return controllerMethod(req, res, next).catch(next);
  };
};

export default catchErrors;
