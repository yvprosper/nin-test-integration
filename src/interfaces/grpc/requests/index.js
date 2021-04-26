import { VerifyTokenRequest } from "stubs/auth/messages_pb";
import { LogEventRequest, DeviceInfo } from "stubs/auditlog/messages_pb";

const createDeviceInfo = (data) => {
  const deviceInfo = new DeviceInfo();
  deviceInfo.setBrowser(data.browser);
  deviceInfo.setOs(data.os);
  deviceInfo.setVersion(data.version);
  return deviceInfo;
};

export const createVerifyTokenRequest = (data) => {
  const verifyTokenRequest = new VerifyTokenRequest();
  verifyTokenRequest.setToken(data.token);
  verifyTokenRequest.setTokenType(data.tokenType);
  verifyTokenRequest.setCurrentUrl(data.setCurrentUrl);
  return verifyTokenRequest;
};

export const createLogEventRequest = (data) => {
  const deviceInfo = createDeviceInfo(data.deviceInfo);
  const logEventRequest = new LogEventRequest();
  logEventRequest.setDeviceInfo(deviceInfo);
  logEventRequest.setActivity(data.activity);
  logEventRequest.setBusinessId(data.businessId);
  logEventRequest.setBusinessType(data.businessType);
  logEventRequest.setEvent(data.event);
  logEventRequest.setIpAddress(data.ipAddress);
  logEventRequest.setResource(data.resource);
  logEventRequest.setUserId(data.userId);
  logEventRequest.setEventDateTime(data.eventDateTime);
  return logEventRequest;
};
