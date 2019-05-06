window.star = window.star || {};


star.storage = (function() {
  var storage = window.localStorage;
  var api = {
    get: function(k) { return storage.getItem(k); },
    set: function(k, v) { storage.setItem(k, v); },
    remove: function(k) { storage.removeItem(k); },
    make: function(k) {
      return {
        get: function() { return api.get(k); },
        set: function(v) { api.set(k, v); },
        remove: function() { api.remove(k); },
        listen: function(f) {
          window.addEventListener('storage', function(e) {
            if (e.key === k &&
                e.storageArea === storage &&
                e.newValue !== null) f(e);
          });
        }
      };
    }
  };
  return api;
})();
