module.exports = (() => {
  var name = "rk2";
  var maxAge = 604800;

  return {
    name,
    expiry() {
      return new Date(Date.now()+maxAge);
    },
    json(game, side) {
      return ({
        name,
        maxAge,
        value: game.player(side).id
      });
    }
  };
})();
