import { init } from 'snabbdom';
import klass from 'snabbdom/modules/class';
import attributes from 'snabbdom/modules/attributes';

export const patch = init([klass, attributes]);

import makeCtrl from './ctrl';
import view from './view/main';
//import boot = require('./boot');
import boot from './boot';

export function start(opts) {
  let vnode, ctrl;

  function redraw() {
    vnode = patch(vnode, view(ctrl));
  }

  ctrl = new makeCtrl(opts, redraw);

  const blueprint = view(ctrl);
  opts.element.innerHTML = '';
  vnode = patch(opts.element, blueprint);

  return {
    redraw: ctrl.redraw
  };
}

window.onload = function() {
  boot(window['star_lobby'], document.querySelector('.lobby__app'));
};
