module.exports = function ExtendColl(coll) {

  coll.uno = (selector, read) => coll.findOne(selector).then(_ => read(_));

  coll.byId = (id, read) => coll.uno({_id: id}, read);


  return coll;
};
