var Duct = require('../hub/Duct');
var GameProxy = require('./GameProxy');

var { EventList } = require('./messageApi');

class Round extends Duct {
  constructor(gameId,
              player,
              socketMap) {
    super();
    this.gameId = gameId;
    this.proxy = new GameProxy(gameId);

    this.player = player;
    this.socketMap = socketMap;
  }

  getGame() { return this.proxy.game(); }

  process(msg) {
    switch(msg.type) {
    case 'fishnetplay':
      var { uci } = msg;
      this.handle(game =>
        this.player.fishnet(game, uci, this.proxy)
      );

      return true;
    }
    return false;
  }

  handle(op) {
    this.handleGame(this.proxy.game(), op);
  }

  handleGame(fuGame, op) {
    this.publish(() => {
      return fuGame.then(game => {
        if (!game) {
          return Promise.reject("game not found");
        }
        return op(game);
      });
    }).catch(errorHandler);
  }

  publish(op) {
    return op().then(events => {
      if (events.length > 0) {
        this.socketMap.tell(this.gameId, EventList(events));
      }
    });
  }
}

function errorHandler(err) {
  console.log(`Round client error ${err} ${err.stack}`);
};

module.exports = Round;
