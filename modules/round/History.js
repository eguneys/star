var VersionedEvent = require('./VersionedEvent');

function History() {

  var maxSize = 25;

  var events = [];
  
  this.getVersion = () => {
    if (events.length > 0) {
      return events[0].version;
    }
    return 0;
  };

  this.addEvents = (xs) => {
    var vevs = xs.reduce((acc, e) => {
      return { _1: [VersionedEvent.apply(e, acc._2 + 1), ...acc._1],
               _2: acc._2 + 1 };
    },{ _1: [], _2: this.getVersion() })._1;

    events = slideEvents(vevs, events);

    return vevs.reverse();
  };

  function slideEvents(newEvents, history) {
    var nb = events.length;
    var i = 0;
    var res = [...newEvents];
    while (nb++ <= maxSize && i < history.length) {
      res.push(history[i++]);
    }
    return res;
  };
  
}

module.exports = {
  apply() {
    return (gameId) => new History();
  }
};
