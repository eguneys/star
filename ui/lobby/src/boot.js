module.exports = function(cfg, element) {
  var pools = [{ id: "2", lim: 2 }];
  var lobby;

  cfg.trans = star.trans(cfg.i18n);
  cfg.element = element;
  cfg.pools = pools;
  lobby = StarLobby.start(cfg);
};
