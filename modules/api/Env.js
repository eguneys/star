var { lazyVal } = require('../common/LazyVal');
const config = require('config');

function Env({ isProd }) {

  this.isProd = isProd;

  this.AssetDomain = config.get("net.asset.domain");
  this.SocketDomain = config.get("net.socket.domain");

}

module.exports = {
  current: lazyVal(() => new Env({
    isProd: require('../common/ExpressApp').isProd
  }))
};
