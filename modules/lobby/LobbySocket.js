var SocketTrouper = require('../socket/SocketTrouper');
var { SendHookRemovals, Member } = require('./messageApi');
var AnonCookie = require('../game/AnonCookie');

class LobbySocket extends SocketTrouper {
  constructor(uidTtl, starBus) {
    super(uidTtl, starBus);

    this.hookSubscriberUids = [];

    this.removedHookIds = "";

    setTimeout(() => this.send(SendHookRemovals), 5000);
  }

  receiveSpecific(msg) {
    switch(msg.type) {
    case "getuidsp": {
      const { promise } = msg;
      promise(Object.keys(this.members));
      return true;
    }
    case "join":  {
      var member = new Member(msg.ws, msg.user, msg.uid);
      this.addMember(msg.uid, member);
      msg.resolve({member});
      return true;
    }
    case "addhook": {
      const { hook } = msg;
      var sendMsg = this.makeMessage("had", hook.render());
      this.hookSubscriberUids.forEach(uid => {
        this.withActiveMemberByUidString(uid)(member => {
          member.push(sendMsg);
        });
      });
      return true;
    }
    case "removehook": {
      const { hookId } = msg;
      this.removedHookIds = `${this.removedHookIds}${hookId}`;
      return true;
    };
    case "joinhook": {
      const { uid, hook, game } = msg;
      
      this.withMember(hook.uid, member => {
        this.notifyPlayerStart(game, 'player1')(member);
      });

      this.withMember(uid, member => {
        this.notifyPlayerStart(game, 'player2')(member);
      });
      
      return true;
    };
    case "sendhookremovals": {
      if (this.removedHookIds.length > 0) {
        var sMsg = this.makeMessage('hrm', this.removedHookIds);
        this.hookSubscriberUids.forEach(uid =>
          this.withActiveMemberByUidString(uid)
          (_ => _.push(sMsg) ));

        this.removedHookIds = "";
      }
      setTimeout(() => this.send(SendHookRemovals), 1245);
      return true;
    }
    case "hooksub": {
      const { member, value } = msg;
      if (!value) {
        this.hookSubscriberUids = this.hookSubscriberUids.filter(uid => uid !== member.uid);
        return true;
      }
      return false;
    }
    case "allhooksfor": {
      const { member, hooks } = msg;
      this.notifyMember("hooks", hooks.map(_ => _.render()))(member);
      this.hookSubscriberUids.push(member.uid);
      return true;
    }
    }
    return false;
  };

  notifyPlayerStart(game, side) {
    return this.notifyMember("redirect", {
      id: game.fullIdOf(side),
      url: this.playerUrl(game.fullIdOf(side)),
      cookie: AnonCookie.json(game, side)
    });
  }

  playerUrl(fullId) { return `/${fullId}`; }

  withActiveMemberByUidString(uid) {
    return (f) => {
      const member = this.members[uid];
      if (member) f(member);
    };
  };

  afterQuit(uid, member) {
    this.hookSubscriberUids = this.hookSubscriberUids.filter(_ => _ !== uid);
  }
}

module.exports = LobbySocket;
