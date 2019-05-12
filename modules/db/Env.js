var { lazyVal } = require('../common/LazyVal');
var mongodbUri = require('mongodb-uri');
const MongoClient = require('mongodb').MongoClient;
var config = require('config');
var ExtendColl = require('./CollExt');

function Env(name) {
  // var uri = config.get('uri');
  var uri = process.env.MONGO_URI;

  this.promise = new Promise(resolve => {
    MongoClient.connect(uri, { useNewUrlParser: true })
      .then(client => {
        var uriObj = mongodbUri.parse(uri);

        this.db = client.db(uriObj.database);
        resolve();
      });
  });

  this.coll = (name) => ExtendColl(this.db.collection(name));

}

module.exports = {
  current: lazyVal(() => new Env("main"))
};
