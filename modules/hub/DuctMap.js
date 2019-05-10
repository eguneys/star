var guavaCache = require('guava-cache');

function DuctMap(mkDuct, accessTimeout) {

  this.getOrMake = (id) => ducts.get(id);

  this.size = () => ducts.size();

  this.kill = (id) => ducts.delete(id);

  var ducts = guavaCache({ 
    expiry: accessTimeout
  })
    .loader((id) => mkDuct(id));
  
}

module.exports = DuctMap;
