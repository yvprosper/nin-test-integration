import { getDeviceInfo } from "infra/support/helpers";
import { asValue } from "awilix";

export default (req, res, next) => {
  const deviceInfo = getDeviceInfo(req);
  req.ipAddress = deviceInfo.ipAddress;
  req.userAgent = deviceInfo.userAgent;

  req.container.register({
    ipAddress: asValue(req.ipAddress),
    userAgent: asValue(req.userAgent),
  });
  next();
};
