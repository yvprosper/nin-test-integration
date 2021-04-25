import { asValue } from "awilix";

const ipAddress = async (ctx, next) => {
  ctx.container.register({
    ipAddress: asValue(ctx.request.call.getPeer()),
  });
  await next();
};

export default ipAddress;
