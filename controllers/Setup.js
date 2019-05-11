const { check, validationResult } = require('express-validator/check');

var { Open, negotiate } = require('./StarController');

var HTTPRequest = require('../modules/common/HTTPRequest');

var HookConfig = require('../modules/setup/HookConfig');
var AiConfig = require('../modules/setup/AiConfig');


var AnonCookie = require('../modules/game/AnonCookie');


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

  var config = new HookConfig(req.body.time);

  env.processor.hook(config, uid, HTTPRequest.sid(ctx.req)).then(result => {
    if (result.type === 'created') {
      res.status(200).json({ ok: true });
    } else {
      res.status(400).json({ 'error': 'game was not created' });
    }
  });
});


const process = (op) => Open((res, ctx) => {
  const errors = validationResult(ctx.req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  var config = new AiConfig(ctx.req.body.time);

  op(config, ctx).then(pov => {
    negotiate({
      html: () => {
        redirectPov(pov, res, ctx);
      }, api: (v) => {
        res.status(200).json({ok: true});
      }
    }, ctx);
  });
});

const redirectPov = (pov, res, ctx) => {
  res.cookie(AnonCookie.name, pov.playerId, {expires: AnonCookie.expiry()});
  res.redirect(`/${pov.fullId}`);
};

exports.ai = process((config, ctx) => {
  return env.processor.ai(config, ctx);
});
