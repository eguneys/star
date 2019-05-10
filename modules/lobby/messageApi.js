var SocketMember = require('../socket/SocketMember');

exports.Member = class Member extends SocketMember {
  constructor(ws, user, uid) {
    super(ws);
    this.user = user;
    this.uid = uid;
  }
};

exports.Join = function(ws, uid, user, resolve) {
  return { type: "join", ws, uid, user, resolve };
};

exports.JoinHook = function(uid, hook, game) {
  return { type: "joinhook", uid, hook, game };
};

exports.AddHook = function(hook) {
  return { type: "addhook", hook };
};

exports.RemoveHook = function(hookId) {
  return { type: "removehook", hookId };
};


exports.RemoveHooks = function(hooks) {
  return { type: "removehooks", hooks };
};

exports.HookSub = function(member, value) {
  return { type: "hooksub", member, value };
};

exports.AllHooksFor = function(member, hooks) {
  return { type: "allhooksfor", member, hooks };
};

exports.SendHookRemovals = { type: 'sendhookremovals' };

exports.GetUidsP = function(promise) {
  return { type: "getuidsp", promise };
};
