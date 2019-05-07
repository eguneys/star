var { PopulationTell } = require('./actorApi');
var Population = require('./Population');

function Env(starBus) {

  var population = new Population(starBus);

  setInterval(() => {
    population.send(PopulationTell);
  }, 5000);

}

module.exports = {
  current: new Env(
    require('../common/ExpressApp').starBus
  )
};
