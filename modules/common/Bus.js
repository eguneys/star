var events = require('events');

module.exports = function Bus() {

  this.publish = function(payload, channel) {
    bus.publish(payload, channel);
  };

  this.subscribe = function(subscriber, ...to) {

    to.forEach(_ => bus.subscribe(subscriber, _));
    
  };

  var eventEmitter = new events.EventEmitter();
  var bus = {
    publish(payload, channel) {
      eventEmitter.emit(channel, payload);
    },
    subscribe(subscriber, event) {
      var listenerFunc = subscriber.receive ? subscriber.receive : subscriber.process;
      eventEmitter.addListener(event, listenerFunc.bind(subscriber));
    }
  };

};
