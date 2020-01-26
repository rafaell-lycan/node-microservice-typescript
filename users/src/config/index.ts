const { NODE_ENV, PORT, LOG_LEVEL } = process.env;

const config = {
  APPLICATION_NAME: 'users-svc',
  IS_PROD: NODE_ENV === 'production',
  PORT: typeof PORT === 'undefined' ? 8080 : parseInt(PORT),
  LOG_LEVEL: typeof LOG_LEVEL === 'undefined' ? 'debug' : LOG_LEVEL,
}

export default config;
