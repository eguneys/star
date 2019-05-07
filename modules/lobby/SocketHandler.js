var { Join } = require('./messageApi');
var Handler = require('../socket/Handler');
var Socket = require('../socket/Socket');

function SocketHandler(socket) {
  var pong = Socket.initialPong;

  var controller = function(socket, member) {
    return function(msg) {
      console.log(msg);
      return false;
    };
  };
  
  var apply = (ws, uid, user) => {
    return socket.ask((resolve) => Join(ws, uid, user, resolve)).then(({member}) => {
      Handler.iteratee(
        ws,
        controller(socket, member),
        member,
        socket,
        uid,
        // onPing
        () => {
          socket.setAlive(uid);
          member.push(pong);
        }
      );
      return true;
    });
  };

  apply.receive = function(payload) {
    switch(payload.type) {
    case 'nbMembers': 
      pong['d'] = payload.nb;
      return true;
    }
    return false;
  };

  return apply;
}

module.exports = SocketHandler;
