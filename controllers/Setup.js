const { check, validationResult } = require('express-validator/check');

var { Open } = require('./StarController');

var HTTPRequest = require('../modules/common/HTTPRequest');

var HookConfig = require('../modules/setup/HookConfig');

var Env = require('../Env');

var env = Env.setup();

exports.hook = Open((res, ctx) => {
  var req = ctx.req;
  var { uid } = ctx.req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  console.log(req.body);

  var config = new HookConfig(req.body.time);

  env.processor.hook(config, uid, HTTPRequest.sid(ctx.req)).then(result => {
    if (result.type === 'created') {
      res.status(200).json({ ok: true });
    } else {
      res.status(400).json({ 'error': 'game was not created' });
    }
  });
});
