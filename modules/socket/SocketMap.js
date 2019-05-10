var TrouperMap = require('../hub/TrouperMap');

module.exports = {
  apply(mkTrouper,
        accessTimeout) {
          var trouperMap = new TrouperMap(
            mkTrouper,
            accessTimeout);

          return trouperMap;
        }
};
