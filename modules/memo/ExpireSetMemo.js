var NodeCache = require('node-cache');

module.exports = function ExpireSetMemo(ttl) {

  var cache = new NodeCache({ stdTTL: ttl });

  this.get = function(key) {
    return cache.get(key);
  };

  this.put = function(key) {
    return cache.set(key, true);
  };

  this.remove = function(key) {
    return cache.del(key);
  };

};
