var { lazyVal } = require('../common/LazyVal');
const config = require('config');
var RoundApi = require('./RoundApi');

function Env({ roundJsonView, isProd }) {

  this.isProd = isProd;

  this.AssetDomain = config.get("net.asset.domain");
  this.SocketDomain = config.get("net.socket.domain");

  this.roundApi = new RoundApi(
    roundJsonView
  );

}

module.exports = {
  current: lazyVal(() => new Env({
    roundJsonView: require('../round/Env').current().jsonView,
    isProd: require('../common/ExpressApp').isProd
  }))
};
