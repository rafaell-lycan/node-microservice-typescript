import express from 'express'

const server = express()

server.use('/_healthcheck', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime()
  });
});

export default server;
