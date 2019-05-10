var SocketMember = require('../socket/SocketMember');

exports.Member = class Member extends SocketMember {

  constructor(ws, user, side, playerId) {
    super(ws);
    this.user = user;
    this.side = side;
    this.playerId = playerId;
  }  
};

exports.Join = function(ws,
                        uid,
                        user,
                        side,
                        playerId,
                        resolve) {
  return { type: "join", ws, uid, user, side, playerId, resolve };
};
