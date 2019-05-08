import { h } from 'snabbdom';
import { bind } from './util';

function tab(ctrl, key, active, content) {
  return h('span', {
    class: { active: key === active },
    hook: bind('mousedown', _ => ctrl.setTab(key), ctrl.redraw)
  }, content);
}


export default function renderTabs(ctrl) {
  const active = ctrl.tab;
  return [
    tab(ctrl, 'pools', active, [ctrl.trans.noarg('quickPairing')]),
    tab(ctrl, 'real_time', active, [ctrl.trans.noarg('lobby')]),
  ];
}
