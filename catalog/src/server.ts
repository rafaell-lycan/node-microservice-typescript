import express from 'express'
import config from './config';

const server = express()

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({
    app: config.APPLICATION_NAME,
    status: 'OK',
    uptime: process.uptime()
  });
});

export default server;
