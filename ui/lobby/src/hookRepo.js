export function init(hook) {
  hook.action = hook.uid === window.star.StrongSocket.sri ? 'cancel' : 'join';
}

export function initAll(ctrl) {
  ctrl.data.hooks.forEach(init);
}

export function add(ctrl, hook) {
  init(hook);
  ctrl.data.hooks.push(hook);
}

export function remove(ctrl, id) {
  ctrl.data.hooks = ctrl.data.hooks.filter(h =>
    h.id !== id);
  ctrl.stepHooks.forEach(h => {
    if (h.id === id) h.disabled = true;
  });
}

export function setAll(ctrl, hooks) {
  ctrl.data.hooks = hooks;
  initAll(ctrl);
}

export function find(ctrl, id) {
  return ctrl.data.hooks.find(h => h.id === id);
}
