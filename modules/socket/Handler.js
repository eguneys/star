var Socket = require('./Socket');

var Handler = {
  defaultOnPing: (socket, member, uid) => {
    socket.setAlive(uid);
    member.push(Socket.initialPong);
  },
  iteratee: (ws, controller,
             member,
             socket,
             uid,
             onPing) => {
               var fullCtrl = (msg) => {
                 if (!controller(msg)) {
                   baseController(socket,
                                  member,
                                  uid,
                                  onPing)(msg);
                 }
               };
               ws.on('message', function(msg) {
                 if (msg === "null") {
                   onPing(socket, member, uid);
                 } else {
                   fullCtrl(msg);
                 }
               });
  }
};

function baseController(socket, member, uid) {
  return function(msg) {
    console.log('base', msg);
  };
};

module.exports = Handler;
