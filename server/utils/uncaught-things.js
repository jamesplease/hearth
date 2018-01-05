const log = require('./log');

process.on('uncaughtException', err => {
  log.fatal({ err }, 'There was an uncaught exception.');
  process.exit(1);
});

process.on('unhandledRejection', err => {
  log.error({ err }, 'There was an unhandled rejection.');
});
