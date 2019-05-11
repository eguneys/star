var { lazyVal } = require('../common/LazyVal');

function Env() {

}

module.exports = {
  current: lazyVal(() =>
    new Env(
    )
  )
};
