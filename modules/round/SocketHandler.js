var Handler = require('../socket/Handler');
var { Join } = require('./messageApi');

module.exports = function SocketHandler(
  roundMap,
  socketMap) {
  
  var controller = function(socket, member) {
    return function(t, msg) {
      switch (t) {
      }
      return false;
    };
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

};
