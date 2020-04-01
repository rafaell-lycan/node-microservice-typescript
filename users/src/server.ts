import express from 'express'
import {useExpressServer } from 'routing-controllers';

const server = express()

useExpressServer(server, {
  controllers: [__dirname + '/api/controllers/*.ts'],
  middlewares: [__dirname + '/api/middlewares/*.ts'],
  defaultErrorHandler: false,
});

export default server;
