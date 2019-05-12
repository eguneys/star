var { Cities, Tiles } = require('jscity/state');

module.exports = function Controller(api) {

  var acquirePost = () => {
    var workMove = api.acquireMove();
    if (workMove) {
      var move = findMove(workMove.game.game);
      api.postMove(workMove.id, move);
    }
    scheduleNext();
  };
  
  var scheduleNext = () => {
    setTimeout(acquirePost, 2000);
  };

  scheduleNext();


  var findMove = (game) => {
    var { SelectCity, Buy, Nobuyland, Sell, Roll } = require('jscity/move');

    var star = game.star;

    switch(star.prompt) {
    case 'roll':
      return Roll();
    case 'buycity':
      var lands = ["land", "building", "villa", "hotel"];
      var buyland;
      lands.forEach(land => {
        const player = star.players[star.turnColor];
        const cost = Cities[Tiles[player.currentTile].key][land].cost;
        if (player.cash >= cost)
          buyland = land;
      });
      if (buyland) {
        return Buy(buyland);
      } else {
        return Nobuyland;
      }
    case 'sell': {
      const cities = [];
      for (var key of Object.keys(star.tolls)) {
        const toll = star.tolls[key];
        if (toll.owner === 'player1') {
          cities.push(key);
        }
      }
      return Sell(cities);
    }
    case 'themecity':
    case 'starcity':
    case 'reducetolls': {
      const cities = star.selectCities;
      return SelectCity(cities[0]);
    }
    }
    
    return null;
  };
};
