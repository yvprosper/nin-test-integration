const logger = async (ctx, next) => {
  const start = new Date();

  await next();
  const ms = new Date() - start;
  console.log("%s %s [%s] - %s ms", ctx.service, ctx.name, ctx.type, ms);
};

export default logger;
