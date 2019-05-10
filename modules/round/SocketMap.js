var SocketMap = require('../socket/SocketMap');
var RoundSocket = require('./RoundSocket');

module.exports = {
  make: ({
    starBus,
    socketTimeout,
    uidTtl,
    disconnectTimeout}) => {
      var socketMap = SocketMap.apply(
        (id) => new RoundSocket(
          starBus,
          uidTtl,
          disconnectTimeout
        ),
        socketTimeout
      );
      return socketMap;           
    }
};
