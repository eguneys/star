var { lazyVal } = require('../common/LazyVal');
var mongodbUri = require('mongodb-uri');
const MongoClient = require('mongodb').MongoClient;
var config = require('config');

function Env(name, config) {
  var uri = config.get('uri');

  this.promise = new Promise(resolve => {
    MongoClient.connect(uri, { useNewUrlParser: true })
      .then(client => {
        var uriObj = mongodbUri.parse(uri);

        this.db = client.db(uriObj.database);

        resolve();
      });
  });

  this.coll = (name) => {
    this.db.collection(name);
  };

}

module.exports = {
  current: lazyVal(() => new Env("main", config.get("mongodb")))
};
