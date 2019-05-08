var Trouper = require('../hub/Trouper');
var ExpireSetMemo = require('../memo/ExpireSetMemo');
var { Broom, SocketEnter, SocketLeave } = require('./actorApi');

class SocketTrouper extends Trouper {

  constructor(uidTtl, starBus) {
    super();

    this.starBus = starBus;

    this.members = {};
    this.aliveUids = new ExpireSetMemo(uidTtl);

    setInterval(() => {
      this.send(Broom);
    }, 12000);
  }

  setAlive(uid) {
    this.aliveUids.put(uid);
  }

  process(msg) {
    if (!this.receiveSpecific(msg)) {
      return this.receiveGeneric(msg);
    }
    return true;
  }

  receiveSpecific(msg) {}

  receiveGeneric(msg) {
    switch(msg.type) {
    case 'broom':
      this.broom();
      return true;      
    case 'quit':
      const { uid } = msg;
      this.withMember(uid, _ => this.quit(uid, _));
      return true;
    }
    return false;
  }

  broom() {
    Object.keys(this.members).forEach(uid => {
      if (!this.aliveUids.get(uid)) this.eject(uid);
    });
  }

  eject(uid) {
    this.withMember(uid, (member) => {
      member.end();
      this.quit(uid);
    });
  }

  quit(uid, member) {
    delete this.members[uid];
    this.starBus.publish(SocketLeave, 'socketLeave');
    this.afterQuit(uid, member);
  }

  afterQuit(uid, member) {}

  addMember(uid, member) {
    this.eject(uid);
    this.members[uid] = member;
    this.setAlive(uid);
    this.starBus.publish(SocketEnter, 'socketEnter');
  }

  withMember(uid, f) {
    var member = this.members[uid];
    if(member) {
      f(member);
    }
  }

  notifyMember(t, data) {
    return (member) => {
      member.push(this.makeMessage(t, data));
    };
  }


  makeMessage(t, data) {
    return { t: t, d: data };
  }

}

module.exports = SocketTrouper;
