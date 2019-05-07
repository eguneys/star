var Processor = require('./Processor');

function Env(starBus) {

  this.processor = new Processor(starBus);

}

module.exports = {
  current: new Env(
    require('../common/ExpressApp').starBus)
};
