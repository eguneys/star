var { AddHook } = require('../lobby/messageApi');

function Processor(bus) {

  this.hook = function(config, uid, sid) {
    return new Promise(resolve => {
      var hook = config.hook(uid, sid);

      if (hook) {
        bus.publish(AddHook(hook), 'lobbyTrouper');
        resolve({ type: 'created' });
      } else {
        resolve({ type: 'refused' });
      }
    });
  };

}

module.exports = Processor;
