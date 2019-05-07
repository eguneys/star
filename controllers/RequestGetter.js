function get(name, req) {
  return req.query[name];
}

exports.getSocketUid = function(name, ctx) {
  return get(name, ctx.req);
};
