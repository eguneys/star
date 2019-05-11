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
    case 'humanplay':
      var p = msg;
      this.handleHumanPlay(p, pov => {
        return this.player.human(p, pov, this.proxy);
      });
      return true;
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

  handleHumanPlay(p, op) {
    this.handlePov(this.proxy.playerPov(p.playerId), op);
  }

  handlePov(fuPov, op) {
    this.publish(() => {
      return fuPov.then(pov => {
        if (!pov) {
          return Promise.reject("pov not found");
        }
        if (pov.player.isAi())
          return Promise.reject("player cant play AI");
        else return op(pov);
      });
    }).catch(errorHandler("handlePov"));
  }

  handleGame(fuGame, op) {
    this.publish(() => {
      return fuGame.then(game => {
        if (!game) {
          return Promise.reject("game not found");
        }
        return op(game);
      });
    }).catch(errorHandler("handleGame"));
  }

  publish(op) {
    return op().then(events => {
      if (events.length > 0) {
        this.socketMap.tell(this.gameId, EventList(events));
      }
    });
  }
}

function errorHandler(name) { 
  return (err) => {
    console.log(`Round client error ${name}
 ${err}
 ${err.stack}`);
  };
};

module.exports = Round;
