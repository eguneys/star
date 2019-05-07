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
      this.quit(uid, member);
    });
  }

  quit(uid, member) {
    delete this.members[uid];
    this.starBus.publish(SocketLeave, 'socketLeave');
  }

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

}

module.exports = SocketTrouper;
