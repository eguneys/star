import { h } from 'snabbdom';
import { bind } from './util';

export function hooks(ctrl) {
  return bind('click', e => {
    const id = e.target.getAttribute('data-id') ||
          e.target.parentNode.getAttribute('data-id');
    ctrl.clickPool(id);
  }, ctrl.redraw);
}

export function render(ctrl) {
  return ctrl.pools.map(pool => {
    return h('div', {
      attrs: { 'data-id': pool.id }
    }, [
      h('div.clock', pool.lim),
      h('div.perf', pool.name)
    ]);
  });
}
