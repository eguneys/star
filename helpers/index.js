var ApiEnv = require('../modules/api/Env');
var apiEnv = ApiEnv.current;

module.exports = function(locals) {
  var isProd = apiEnv.isProd;

  locals.isProd = isProd;

  i18nHelper(locals);
  assetHelper(locals, isProd);
};

function i18nHelper(locals) {
  function Translated(key, value) {
    this.key = key;
    this.value = value; 

    this.apply = (n) => {
      return this.value.replace('%s', n);
    };
  }

  locals.trans = {
    nbPlayers: new Translated('nbPlayers', '%s online players'),
    nbGamesInPlay: new Translated('nbGamesInPlay', '%s games in play'),
    quickPairing: new Translated('quickPairing', 'Quick Pairing')
  };

  locals.i18nJsObject = function(keys) {
    var res = {};
    keys.forEach(key => {
      res[key.key] = key.value;
    });
    return res;
  };
}

function assetHelper(locals, isProd) {

  var assetDomain = require('../modules/api/Env').current.AssetDomain;
  
  var assetBaseUrl = `//${assetDomain}`;


  locals.cssTag = function(name) {
    return cssTagWithTheme(name, 'light');
  };

  locals.staticUrl = function(path) {
    return `${assetBaseUrl}/assets/${path}`;
  };

  locals.jsAt = function(path, defer = false) {
    return `<script src=${assetUrl(path)} ${defer?"defer":""}></script>`;
  };

  locals.embedJsUnsafe = function(js) {
    return `<script>${js}</script>`;
  };

  function cssTagWithTheme(name, theme) {
    return cssAt(`css/${name}.${theme}.${isProd?"min":"dev"}.css`);
  };

  function cssAt(path) {
    return `<link href=${assetUrl(path)} type="text/css" rel="stylesheet"/>`;
  }

  function assetUrl(path) {
    return `${assetBaseUrl}/assets/${path}`;
  }
}
