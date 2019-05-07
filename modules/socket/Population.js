var Trouper = require('../hub/Trouper');
var { NbMembers } = require('./actorApi');

module.exports = class Population extends Trouper {

  constructor(starBus) {
    super();
    this.starBus = starBus;

    this.nb = 0;

    console.log(this.nb);
    this.starBus.subscribe(this, 'socketEnter', 'socketLeave');
  }

  process(msg) {
    switch(msg.type) {
    case 'populationtell': 
      this.starBus.publish(NbMembers(this.nb), 'nbMembers');
      return true;
    case 'socketenter':
      this.nb = this.nb + 1;
      return true;
    case 'socketleave':
      this.nb = this.nb - 1;
      return true;
    }
    return false;
  };
  
};
