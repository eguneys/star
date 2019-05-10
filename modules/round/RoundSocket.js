var SocketTrouper = require('../socket/SocketTrouper');

var { Member } = require('./messageApi');

class RoundSocket extends SocketTrouper {
  
  constructor(starBus, 
              uidTtl,
              disconnectTimeout) {
    super(uidTtl, starBus);

    
  }

  receiveSpecific(msg) {
    switch(msg.type) {
    case "join":
      var member = new Member(msg.ws,
                              msg.user,
                              msg.side,
                              msg.playerId);
      this.addMember(msg.uid, member);
      msg.resolve({member});
      return true;
    }
    return false;
  }

  
}

module.exports = RoundSocket;
