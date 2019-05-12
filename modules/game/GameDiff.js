var { Fields: F } = require('./BSONHandlers');

module.exports = function GameDiff(game) {
  var sets = {}, unsets = {};
  function d(name, getter) {
    var vb = getter(game);
    if (vb === undefined || vb === null || vb === "") unsets[name] = true;
    else sets[name] = vb;
  }

  d(F.Game.turns, _ => _.turns());
  d(F.Game.binaryStreaks, _ => _.board().streaks);
  d(F.Game.binaryTolls, _ => _.board().tolls);
  d(F.Game.binaryPlayers, _ => _.board().players);
  d(F.Game.binaryPrompt, _ => _.board().prompt);
  d(F.Game.binarySelectCities, _ => _.board().selectCities);
  d(F.Game.binaryNeedMoney, _ => _.board().needMoney);

  return { sets, unsets };
};
