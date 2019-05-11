var SocketMap = require('../socket/SocketMap');
var RoundSocket = require('./RoundSocket');

module.exports = {
  make: ({
    makeHistory,
    starBus,
    socketTimeout,
    uidTtl,
    disconnectTimeout}) => {
      var socketMap = SocketMap.apply(
        (id) => new RoundSocket(
          id,
          starBus,
          uidTtl,
          disconnectTimeout,
          makeHistory(id)
        ),
        socketTimeout
      );
      return socketMap;           
    }
};
