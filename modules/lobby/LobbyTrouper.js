var Biter = require('./Biter');
var HookRepo = require('./HookRepo');
var Trouper = require('../hub/Trouper');

class LobbyTrouper extends Trouper {

  process(msg) {
    switch (msg.type) {
    case 'addhook':
      var hook = msg.hook;
      var _ = HookRepo.byUid(hook.uid);
      if (_) this.remove(_);

      var comp = this.findCompatible(hook);
      console.log(comp);
      if (comp) {
        this.biteHook(comp.id, hook.uid);
      } else {
        HookRepo.save(hook);
      }
      return true;
    case 'joinhook':
      const { hook, game } = msg;
      this.remove(hook);
    }
    return false;
  }

  biteHook(hookId, uid) {
    var hook = HookRepo.byId(hookId);
    if (hook) {
      this.remove(hook);
      var _ = HookRepo.byUid(uid);
      if (_) this.remove(_);
      Biter.apply(hook, uid).then(_ => this.send(_));
    }
  }

  findCompatible(hook) {
    return this.findCompatibleIn(hook, HookRepo.findCompatible(hook));
  }

  findCompatibleIn(hook, ins) {
    if (ins.length === 0) {
      return null;
    }
    var h = ins[0];
    if (Biter.canJoin(h, hook.user)) return h;
    return this.findCompatibleIn(hook, ins.slice(1));
  }

  remove(hook) {
    HookRepo.remove(hook);
  }
  
}

LobbyTrouper.start = function(broomPeriod, 
                              starBus) {
  return function(makeTrouper) {
    var trouper = makeTrouper();
    starBus.subscribe(trouper, 'lobbyTrouper');
    return trouper;
  };
};

module.exports = LobbyTrouper;
