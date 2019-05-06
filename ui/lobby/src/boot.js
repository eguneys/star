module.exports = function(cfg, element) {
  var pools = [{ id: "2", lim: 2 }];
  var lobby;

  var onFirstConnect = function() {
    
  };

  cfg.trans = star.trans(cfg.i18n);
  cfg.element = element;
  cfg.pools = pools;
  lobby = StarLobby.start(cfg);

  star.socket = star.StrongSocket(
    '/lobby/socket/v4',
    false, {
      receive: function(t, d) {
        lobby.socketReceive(t, d);
      },
      events: {
        n: function(nbUsers, msg) {
          nbUserSpread(msg.d);
          setTimeout(function() {
            nbRoundSpread(msg.r);
          }, star.socket.pingInterval() / 2);
        }
      },
      options: {
        name: 'lobby',
        onFirstConnect: onFirstConnect
      }
    });
};
