var ApiEnv = require('../modules/api/Env');
var apiEnv = ApiEnv.current;

module.exports = function(locals) {
  var isProd = apiEnv.isProd;

  var assetDomain = require('../modules/api/Env').current.AssetDomain;
  
  var assetBaseUrl = `//${assetDomain}`;

  locals.cssTag = function(name) {
    return cssTagWithTheme(name, 'light');
  };

  locals.staticUrl = function(path) {
    return `${assetBaseUrl}/assets/${path}`;
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
};
