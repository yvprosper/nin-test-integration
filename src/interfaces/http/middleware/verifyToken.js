import { asValue } from "awilix";
import UnauthorizedError from "interfaces/http/errors/Unauthorized";

export default (tokenType = "jwt") => {
  return async (req, res, next) => {
    try {
      const { userGrpcClient } = req.container.cradle;
      const { headers } = req;
      const jwtToken = headers.authorization && headers.authorization.split("Bearer ")[1];
      const apiToken = headers.token;
      const token = tokenType === "jwt" ? jwtToken : apiToken;
      const data = await userGrpcClient.verifyToken({
        tokenType,
        token,
        currentUrl: req.url,
      });
      // save user to req.user
      req.user = data.user;
      // save user to container so it is available to any method, function with access to the container
      req.container.register({
        currentUser: asValue(data.user),
      });
      next();
    } catch (error) {
      next(new UnauthorizedError(error.message));
    }
  };
};
