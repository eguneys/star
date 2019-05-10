var Biter = require('./Biter');
var HookRepo = require('./HookRepo');
var Trouper = require('../hub/Trouper');
var ResilientScheduler = require('../common/ResilientScheduler');
var { GetUidsP, AllHooksFor, RemoveHook, RemoveHooks } = require('./messageApi');

class LobbyTrouper extends Trouper {

  constructor(socket) {
    super();
    this.socket = socket;
  }

  process(msg) {
    switch (msg.type) {
    case 'tick': {
      const { promise } = msg;
      this.socket.ask(GetUidsP).then(uids => {
        this.send(WithPromise(uids, promise));
      });
      return true;
    }
    case 'withpromise': {
      const { value, promise } = msg;
      const uids = value;

      var hooks = HookRepo.notInUids(uids);
      if (hooks.length > 0) {
        this.send(RemoveHooks(hooks));
      }
      promise();
      return true;
    }
    case 'removehooks': {
      msg.hooks.forEach(_ => this.remove(_));
      return true;
    }
    case 'addhook': {
      var hook = msg.hook;
      var _ = HookRepo.byUid(hook.uid);
      if (_) this.remove(_);

      var comp = this.findCompatible(hook);
      if (comp) {
        this.biteHook(comp.id, hook.uid);
      } else {
        HookRepo.save(hook);
        this.socket.send(msg);
      }
      return true;
    }
    case 'joinhook': {
      const { hook, game } = msg;
      this.socket.send(msg);
      this.remove(hook);
      return true;
    }
    case 'hooksub': {
      const { member, value } = msg;
      if (value) {
        this.socket.send(AllHooksFor(member, HookRepo.vector()));
        return true;
      }
      return false;
    }
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
    this.socket.send(RemoveHook(hook.id));
  }
  
}

LobbyTrouper.start = function(broomPeriod, 
                              starBus) {
  return function(makeTrouper) {
    var trouper = makeTrouper();
    starBus.subscribe(trouper, 'lobbyTrouper');

    setTimeout(() => {
      ResilientScheduler(broomPeriod, () => {
        return trouper.ask(Tick);
      });
    },7000);

    return trouper;
  };
};

var Tick = (promise) => {
  return { type: 'tick', promise };
};

var WithPromise = (value, promise) => {
  return { type: 'withpromise', value, promise };
};

module.exports = LobbyTrouper;
