var { AddHook } = require('../lobby/messageApi');
var GameRepo = require('../game/GameRepo');

function Processor(bus, fishnetPlayer) {

  this.hook = function(config, uid, sid) {
    return new Promise(resolve => {
      var hook = config.hook(uid, sid);

      if (hook) {
        bus.publish(AddHook(hook), 'lobbyTrouper');
        resolve({ type: 'created' });
      } else {
        resolve({ type: 'refused' });
      }
    });
  };

  this.ai = function(config, ctx) {
    var pov = config.pov(ctx.me);
    return GameRepo.insertDenormalized(pov.game)
      .finally(() => {
        if (pov.game.player().isAi) {
          //fishnetPlayer(pov.game);
        }
      })
      .inject(pov);
  };

}

module.exports = Processor;
