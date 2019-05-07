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
