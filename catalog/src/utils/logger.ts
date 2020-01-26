import winston from 'winston';
import config from '../config'

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.label({ label: config.APPLICATION_NAME }),
    winston.format.simple(),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(({ level, message, label, timestamp }) => {
      return `[${label}:${level}] ${message} (${timestamp})`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
