import { createConnection } from 'typeorm';

import logger from '../utils/logger';

const dbConnect = async () => {
  logger.info('Connecting to database...')
  await createConnection()
  logger.info('Database connect!')
};

export default { dbConnect };
