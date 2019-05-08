var guavaCache = require('guava-cache');

function DuctMap(mkDuct, accessTimeout) {

  this.getOrMake = (id) => this.ducts.get(id);

  this.size = () => this.ducts.size();

  this.kill = (id) => this.ducts.delete(id);

  this.ducts = guavaCache({ 
    expiry: accessTimeout
  })
    .loader((id) => mkDuct(id));
  
}

module.exports = DuctMap;
