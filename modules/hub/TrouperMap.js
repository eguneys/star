var guavaCache = require('guava-cache');

module.exports = function TrouperMap(
  mkTrouper,
  accessTimeout) {

  this.getOrMake = (id) => troupers.get(id);

  this.kill = (id) => troupers.delete(id);

  var troupers = guavaCache({
    expiry: accessTimeout
  })
      .on('delete', (id, trouper) => {
        trouper.stop();
      })
      .loader(id => mkTrouper(id));
  
};
