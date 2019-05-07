var config = require('config');
var LobbySocket = require('./LobbySocket');
var SocketHandler = require('./SocketHandler');
var LobbyTrouper = require('./LobbyTrouper');

function Env(config,
             starBus) {
  var SocketUidTtl = config.get("socket.uid.ttl");
  var BroomPeriod = config.get("broom_period");
  
  var socket = new LobbySocket(SocketUidTtl, starBus);

  this.lobbyTrouper = LobbyTrouper.start(
    broomPeriod = BroomPeriod,
    starBus
  )(() => {
    return new LobbyTrouper(
      socket
    );
  });

  this.socketHandler = new SocketHandler(socket);

  starBus.subscribe(this.socketHandler, 'nbMembers', 'nbRounds');
}

module.exports = {
  current: new Env(config.get("lobby"),
                   require('../common/ExpressApp').starBus)
};
