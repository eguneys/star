module.exports = (() => {

  var hooks = [];

  return {
    vector: () => hooks,
    findCompatible(hook) {
      return hooks.filter(_ => _.compatibleWith(hook));
    },
    byId(id) {
      return hooks.find(_ => _.id === id);
    },
    byUid(uid) {
      return hooks.find(_ => _.uid === uid);
    },
    save(hook) {
      hooks = hooks.filter(_ => _.id !== hook.id);
      hooks.push(hook);
    },
    remove(hook) {
      hooks = hooks.filter(_ => _.id !== hook.id);
    }
  };
})();
