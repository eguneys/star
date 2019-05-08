var Random = require('../common/Random');

function Hook(id, uid, mode) {
  this.id = id;
  this.uid = uid;
  this.mode = mode;

  this.compatibleWith = (h) => {
    return h.mode === this.mode;
  };

  this.render = () => ({
    id: this.id,
    uid: this.uid
  });
};

Hook.make = function(uid, sid, mode) {
  var idSize = 8;
  return new Hook(Random.nextString(idSize),uid, mode);
};

module.exports = Hook;
