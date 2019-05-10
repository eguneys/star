var { reqToCtx } = require('./StarController');

exports.SocketOption = function(f) {
  return function(ws, req) {
    return reqToCtx(req).then(f.bind(null, ws)).then(result => {
      if (!result) {
        ws.terminate();
      }
    });
  };
};

exports.Socket = function(f) {
  return function(ws, req) {
    return reqToCtx(req).then(f.bind(null, ws));
  };
}
