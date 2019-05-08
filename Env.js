var { lazyVal } = require('./modules/common/LazyVal');
var config = require('config');

function EnvClass(config) {
  Env.db().promise.then(() => {
    Env.game();
    Env.round();
    Env.lobby();
    Env.setup();
    Env.socket();
  });
}

const Env = {
  current: lazyVal(() => new EnvClass(config)),
  db: () => require('./modules/db/Env').current(),
  game: () => require('./modules/game/Env').current(),
  round: () => require('./modules/round/Env').current(),
  lobby: () => require('./modules/lobby/Env').current(),
  setup: () => require('./modules/setup/Env').current(),
  socket: () => require('./modules/socket/Env').current(),
};

module.exports = Env;
