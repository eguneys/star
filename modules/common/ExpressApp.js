function isMode(mode) {
  return process.env.NODE_ENV === mode;
}

var ExpressApp = {
  isProd: isMode('development'),
  starBus: new (require('./Bus'))
};

module.exports = ExpressApp;
