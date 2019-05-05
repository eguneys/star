const config = require('config');

function Env({ isProd }) {

  this.isProd = isProd;

  this.AssetDomain = config.get("net.asset.domain");

}

module.exports = {
  current: new Env({
    isProd: require('../common/ExpressApp').isProd
  })
};
