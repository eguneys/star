var Handler = require('../socket/Handler');
var { Join, HumanPlay } = require('./messageApi');

var { Move } = require('jscity/move');

module.exports = function SocketHandler(
  roundMap,
  socketMap) {

  var controller = function(gameId,
                            socket,
                            uid,
                            member) {
    this.send = (msg) =>
    roundMap.tell(gameId, msg);

    var playerId = member.playerId;

    if (!playerId) {
      return function(t, msg) {
        switch (t) {
        }
        return false;
      };
    } else {
      return function(t, msg) {
        switch (t) {
        case "move":
          const ackId = msg.d.a;
          const move = Move.apply(msg.d || {});
          if (move) {
            this.send(HumanPlay(playerId, move));
          }
          member.push(ackMessage(ackId));
          return true;
        }
        return false;
      };      
    }

  };
  
  
  
  this.player = (ws, pov, uid, user) => 
  this.join(ws, pov, pov.playerId, uid, user);

  this.join = (ws, pov, playerId, uid, user) => {
    var socket = socketMap.getOrMake(pov.gameId);

    socket.ask(promise => Join(ws,
                               uid,
                               user,
                               pov.side,
                               playerId,
                               promise))
      .then(({member}) => {
        var onPing = Handler.defaultOnPing;
        Handler.iteratee(
          ws,
          controller(pov.gameId,
                     socket,
                     uid,
                     member),
          member,
          socket,
          uid,
          onPing);
        
      });
    return true;
  };

  var ackEmpty = { t: 'ack' };
  function ackMessage(id) {
    if (!id) {
      return ackEmpty;
    } else {
      return {...ackEmpty, d: id};
    }
  }

};
