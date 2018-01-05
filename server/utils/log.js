const pino = require('pino');

module.exports = pino({
  serializers: {
    ...pino.stdSerializers
  }
});
