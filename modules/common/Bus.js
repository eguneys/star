var events = require('events');
var Tellable = require('./Tellable');

module.exports = function Bus() {

  this.publish = function(payload, channel) {
    bus.publish(payload, channel);
  };

  this.subscribe = function(subscriber, ...to) {
    to.forEach(_ => bus.subscribe(subscriber, _));
  };

  this.subscribeFun = function(to, f) {
    var t = Tellable.applyFun(f);
    this.subscribe(t, to);
  };

  this.subscribeFuns = function(subscriptions) {
    Object.keys(subscriptions)
      .forEach((classifier) => {
        var subscriber = subscriptions[classifier];
        this.subscribeFun(classifier, subscriber);
      });
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
