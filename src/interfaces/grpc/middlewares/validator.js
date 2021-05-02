const validatorMiddleware = (schema) => {
  return async (ctx, next) => {
    await schema.validateAsync(ctx.req.toObject(), {
      abortEarly: false,
    });
    await next();
  };
};
export default validatorMiddleware;
