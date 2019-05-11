
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
      return Nobuyland;
    }
    return null;
  };
};
