var randomstring = require('randomstring');

module.exports = {
  nextString: (size) => {
    return randomstring.generate(size);
  }
};
