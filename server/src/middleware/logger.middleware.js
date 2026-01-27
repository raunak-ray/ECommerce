import logger from "../config/winston.config.js";

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    if (res.statusCode >= 400) return;
    const time = Date.now() - start;
    logger.info({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${time}ms`,
    });
  });
  next();
};

export default loggerMiddleware;
