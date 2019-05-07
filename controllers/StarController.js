var { UserContext } = require('../modules/user/UserContext');
var Mobile = require('../modules/api/Mobile');

exports.Open = function(f) {
  return function(req, res) {
    return handleOpen(f.bind(null, res), req);
  };
};

exports.negotiate = function({ html, api }, ctx) {
  const version = Mobile.Api.requestVersion(ctx.req);
  return version?api(version):html();
};

function handleOpen(f, req) {
  reqToCtx(req).then(f);
}

function reqToCtx(req) {
  return restoreUser(req).then(d => {
    var ctx = UserContext(req);
    return ctx;
  });
}

function restoreUser(req) {
  return Promise.resolve();
}

exports.reqToCtx = reqToCtx;
