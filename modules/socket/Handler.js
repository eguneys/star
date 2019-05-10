var Socket = require('./Socket');
var { Quit } = require('./messageApi');

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
               var fullCtrl = (t, msg) => {
                 if (!controller(t, msg)) {
                   baseController(socket,
                                  member,
                                  uid,
                                  onPing)(t, msg);
                 }
               };
               ws.on('message', function(msg) {
                 msg = JSON.parse(msg);
                 if (msg === null) {
                   onPing(socket, member, uid);
                 } else {
                   fullCtrl(msg.t, msg);
                 }
               });
               ws.on('close', function() {
                 socket.send(Quit(uid));
               });
  }
};

function baseController(socket, member, uid) {
  return function(t, msg) {
    console.log('base', msg);
  };
};

module.exports = Handler;
