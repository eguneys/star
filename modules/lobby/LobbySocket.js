var SocketTrouper = require('../socket/SocketTrouper');
var { Member } = require('./messageApi');

class LobbySocket extends SocketTrouper {
  constructor(uidTtl, starBus) {
    super(uidTtl, starBus);
  }

  receiveSpecific(msg) {
    switch(msg.type) {
    case "join": 
      var member = new Member(msg.ws, msg.user, msg.uid);
      this.addMember(msg.uid, member);
      msg.resolve({member});
      return true;
    }
    return false;
  };
}

module.exports = LobbySocket;
