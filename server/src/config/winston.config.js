import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LEVEL || "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
