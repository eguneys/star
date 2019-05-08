var { UserContext } = require('../modules/user/UserContext');
var Mobile = require('../modules/api/Mobile');

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


function Open(f) {
  return function(req, res) {
    return handleOpen(f.bind(null, res), req);
  };
}

function negotiate({ html, api }, ctx) {
  const version = Mobile.Api.requestVersion(ctx.req);
  return version?api(version):html();
}

function OptionFuResult(fua, res, ctx) {
  return function(op) {
    fua.then(a => {
      if (a) {
        op(a);
      } else
        notFound(ctx, res);
    }).catch(err => {
      error(ctx, res, err);
    });
  };
}

function error(ctx, res, err) {
  negotiate({
    html() {
      res.locals.message = err.message ? err.message: err;
      res.locals.error = ctx.req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.render('error');
    },
    api(v) {
      res.status(500).json(jsonError(err.message));
    }
  }, ctx);
}


function notFound(ctx, res) {
  negotiate({
    html() {
      res.render('base/notFound', { title: 'Page not found' });
    },
    api(v) {
      res.status(404).json(jsonError('Resource not found'));
    }
  }, ctx);
}

const jsonError = (msg) => ({ error: msg });


module.exports = {
  reqToCtx,
  Open,
  negotiate,
  OptionFuResult
};

