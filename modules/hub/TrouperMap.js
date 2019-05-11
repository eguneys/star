var guavaCache = require('guava-cache2');

module.exports = function TrouperMap(
  mkTrouper,
  accessTimeout) {

  this.getOrMake = (id) => troupers.get(id);

  this.getIfPresent = (id) => {
    if (troupers.has(id)) {
      return troupers.get(id);
    }
    return null;
  };

  this.kill = (id) => troupers.delete(id);

  this.tell = (id, msg) => this.getOrMake(id).send(msg);

  this.touch = (id) => this.getIfPresent(id);

  var troupers = guavaCache({
    expiry: accessTimeout
  })
      .on('delete', (id, trouper, reason) => {
        trouper.stop();
      })
      .loader(id => mkTrouper(id));
  
};
