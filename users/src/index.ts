import 'dotenv/config'
import 'reflect-metadata';
import { Container } from 'typedi';
import { useContainer as useValidatorContainer } from 'class-validator';
import { useContainer as useRoutingContainer } from 'routing-controllers';
import { useContainer as useOrmContainer } from 'typeorm';

import config from './config';
import logger from './utils/logger';
import server from './server';
import database from './database';

async function main() {
  useValidatorContainer(Container);
  useRoutingContainer(Container);
  useOrmContainer(Container);

  await database.dbConnect();
  await server.listen(config.PORT);

  logger.debug(`
  ------------
  Server Started!
  Http: http://localhost:${config.PORT}
  Health: http://localhost:${config.PORT}/_healthcheck
  ------------
  \r`);
}

const errorHandler = (err: Object | null | undefined) => {
  if (err) logger.error(err);
  process.exit(1);
}

process.on('unhandledRejection', errorHandler);

process.on('uncaughtException', errorHandler);

main();
