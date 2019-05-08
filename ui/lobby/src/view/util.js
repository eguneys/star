import { h } from 'snabbdom';

export function bind(eventName, f, redraw) {
  return {
    insert(vnode) {
      vnode.elm.addEventListener(eventName, e => {
        const res = f(e);
        if (redraw) redraw();
        return res;
      });
    }
  };
}

export function tds(bits) {
  return bits.map(bit => {
    return h('td', [bit]);
  });
}
