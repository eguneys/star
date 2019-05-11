var guavaCache = require('guava-cache2');

function DuctMap(mkDuct, accessTimeout) {

  this.getOrMake = (id) => ducts.get(id);

  this.tell = (id, msg) => this.getOrMake(id).send(msg);

  this.size = () => ducts.size();

  this.kill = (id) => ducts.delete(id);

  var ducts = guavaCache({ 
    expiry: accessTimeout
  })
    .loader((id) => mkDuct(id));
  
}

module.exports = DuctMap;
