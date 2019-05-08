var { lazyVal } = require('../common/LazyVal');
var Processor = require('./Processor');

function Env(starBus) {

  this.processor = new Processor(starBus);

}

module.exports = {
  current: lazyVal(() =>
    new Env(
      require('../common/ExpressApp').starBus)
  )
};
