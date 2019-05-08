const { check, validationResult } = require('express-validator/check');

var { reqToCtx } = require('./StarController');

var HTTPRequest = require('../modules/common/HTTPRequest');

var HookConfig = require('../modules/setup/HookConfig');

var Env = require('../Env');

var env = Env.setup();

exports.hook = function(req, res) {
  var uid = req.params.uid;

  reqToCtx(req).then((ctx) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    var config = new HookConfig();

    env.processor.hook(config, uid, HTTPRequest.sid(ctx.req)).then(result => {
      if (result.type === 'created') {
        res.status(200).json({ ok: true });
      } else {
        res.status(400).json({ 'error': 'game was not created' });
      }
    });
    
  });
};
