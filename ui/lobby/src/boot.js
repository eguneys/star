module.exports = function(cfg, element) {
  var pools = [{ id: "2", lim: 2 }];
  var lobby;

  var nbRoundSpread = spreadNumber(
    document.querySelector('#nb_games_in_play > strong'),
    8,
    function() {
      return star.socket.pingInterval();
    });
  var nbUserSpread = spreadNumber(
    document.querySelector('#nb_connected_players > strong'),
    10,
    function() {
      return star.socket.pingInterval();
    });


  var onFirstConnect = function() {
    
  };

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

  cfg.trans = star.trans(cfg.i18n);
  cfg.socketSend = star.socket.send;
  cfg.element = element;
  cfg.pools = pools;
  lobby = StarLobby.start(cfg);

  function spreadNumber(el, nbSteps, getDuration) {
    var previous, displayed;
    var display = function(prev, cur, it) {
      var val = star.numberFormat(Math.round(((prev * (nbSteps - 1 - it)) + (cur * (it + 1))) / nbSteps));
      if (val != displayed) {
        el.textContent = val;
        displayed = val;
      }
    };
    var timeouts = [];
    return function(nb, overrideNbSteps) {
      if (!el || (!nb && nb !== 0)) return;
      if (overrideNbSteps) nbSteps = Math.abs(overrideNbSteps);
      timeouts.forEach(clearTimeout);
      timeouts = [];
      var prev = previous === 0 ? 0 : (previous || nb);
      previous = nb;
      var interv = Math.abs(getDuration() / nbSteps);
      for (var i = 0; i < nbSteps; i++) {
        timeouts.push(setTimeout(display.bind(null, prev, nb, i), Math.round(i * interv)));
      }
    };
  }
};
