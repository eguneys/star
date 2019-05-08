exports.Member = function Member(ws, user, uid) {
  this.ws = ws;
  this.user = user;
  this.uid = uid;

  this.push = function(msg) {
    ws.send(JSON.stringify(msg));
  };

  this.end = function() {
    ws.terminate();
  };
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

exports.HookSub = function(member, value) {
  return { type: "hooksub", member, value };
};

exports.AllHooksFor = function(member, hooks) {
  return { type: "allhooksfor", member, hooks };
};

exports.SendHookRemovals = { type: 'sendhookremovals' };
