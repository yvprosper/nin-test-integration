import container from "src/container";

export default async (ctx, next) => {
  ctx.container = container;
  await next();
};
