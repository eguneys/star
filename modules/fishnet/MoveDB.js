var hubApi = require('../hub/messageApi');

module.exports = function MoveDB(starBus) {

  var coll = {};

  this.add = (move) => {
    coll[move.id] = move;
  };

  this.acquire = () => {
    var head = coll[Object.keys(coll)[0]];
    return head;
  };

  this.postResult = (moveId, data) => {
    var move = coll[moveId];
    if (data) {
      starBus.publish(hubApi.map.Tell(move.game.id, hubApi.round.FishnetPlay(data)), 'roundMapTell');
    }
    delete coll[moveId];
  };

};
