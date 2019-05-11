var SocketTrouper = require('../socket/SocketTrouper');

var { Member } = require('./messageApi');

class RoundSocket extends SocketTrouper {
  
  constructor(gameId,
              starBus,
              uidTtl,
              disconnectTimeout,
              history,
              keepMeAlive) {
    super(uidTtl, starBus);

    this.gameId = gameId;
    this.history = history;
    this.keepMeAlive = keepMeAlive;
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
    case "eventlist":
      this.notify(msg.events);
      return true;
    }
    return false;
  }

  broom() {
    super.broom();
    if (Object.keys(this.members).length > 0) {
      this.keepMeAlive();
    }
  }


  notify(events) {
    var vevents = this.history.addEvents(events);
    Object.values(this.members).forEach(m => {
      var msgs = this.batchMsgs(m, vevents);
      if (msgs) {
        m.push(msgs);
      }
    });
  }

  batchMsgs(member, vevents) {
    switch(vevents.length) {
    case 0: return null;
    case 1: return vevents[0].jsFor(member);
    default:
      return this.makeMessage("b", vevents.map(_ => _.jsFor(member)));
    }
  }
  
}

module.exports = RoundSocket;
