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

star.numberFormat = (function() {
  var formatter = false;
  return function(n) {
    if (formatter === false) formatter = (window.Intl && Intl.NumberFormat) ? new Intl.NumberFormat() : null;
    if (formatter === null) return n;
    return formatter.format(n);
  };
})();

star.hasToReload = false;
star.redirectInProgress = false;
star.redirect = function(obj) {
  var url;
  if (typeof obj === "string") url = obj;
  else {
    url = obj.url;
    if (obj.cookie) {
      var domain = document.domain.replace(/^.+(\.[^\.]+\.[^\.]+)$/ , '$1');
      var cookie = [
        encodeURIComponent(obj.cookie.name) + '=' + obj.cookie.value,
        '; max-age=' + obj.cookie.maxAge,
        '; path=/',
        '; domain=' + domain
      ].join('');
      document.cookie = cookie;
    }
  }
  var href = '//' + location.host + '/' + url.replace(/^\//, '');
  star.redirectInProgress = href;
  location.href = href;
};
star.reload = function() {
  if (star.redirectInProgress) return;
  star.hasToReload = true;
  if (location.hash) location.reload();
  else location.href = location.href;
};
