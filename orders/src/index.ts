import 'dotenv/config'
import config from './config';
import logger from './utils/logger';
import server from './server';

async function main() {
  await server.listen(config.PORT);
  logger.info(`
    ------------
    Server Started!
    Http: http://localhost:${config.PORT}
    Health: http://localhost:${config.PORT}/_healthcheck
    ------------
  `);
}

process.on('unhandledRejection', (err) => {
  if (err) logger.error(err);

  process.exit(1);
});

process.on('uncaughtException', (err) => {
  if (err) logger.error(err);

  process.exit(1);
});

main();
