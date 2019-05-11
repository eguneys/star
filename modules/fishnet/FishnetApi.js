module.exports = function FishnetApi(moveDb) {

  this.postMove = (workId, data) => moveDb.postResult(workId, data);

  this.acquireMove = () => moveDb.acquire();

};
