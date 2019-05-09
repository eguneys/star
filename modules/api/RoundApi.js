var async = require('async');

module.exports = function RoundApi(jsonView) {
 
  this.player = (pov, apiVersion, ctx) =>
  async.parallel({
    json: (cb) => jsonView.playerJson(pov, apiVersion, ctx.me).then(cb.bind(null, null))
  }).then(({json}) => {
    return json;
  });
};
