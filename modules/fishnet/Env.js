var { lazyVal } = require('../common/LazyVal');
var MoveDB = require('./MoveDB');
var Player = require('./Player');
var FishnetApi = require('./FishnetApi');
var Controller = require('./Controller');

function Env(starBus) {

  var moveDb = new MoveDB(starBus);

  var api = new FishnetApi(moveDb);
  
  this.player = new Player(moveDb);
  
  new Controller(api);

}

module.exports = {
  current: lazyVal(() =>
    new Env(
      require('../common/ExpressApp').starBus
    )
  )
};
