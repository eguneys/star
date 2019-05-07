var Hook = require('../lobby/Hook');

module.exports = function HookConfig(mode) {
  this.mode = mode;

  this.hook = (uid, sid) => {
    return Hook.make(uid, sid, mode);
  };
};
