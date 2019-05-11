var SocketMember = require('../socket/SocketMember');

exports.EventList = (events) => ({
  type: 'eventlist', events
});

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

exports.HumanPlay = function(playerId, move) {
  return { type: "humanplay", playerId, move };
};
