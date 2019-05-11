var { lazyVal } = require('../common/LazyVal');
var Processor = require('./Processor');

function Env(starBus, fishnetPlayer) {

  this.processor = new Processor(starBus,
                                 fishnetPlayer);

}

module.exports = {
  current: lazyVal(() =>
    new Env(
      require('../common/ExpressApp').starBus,
      require('../fishnet/Env').current().player
    )
  )
};
