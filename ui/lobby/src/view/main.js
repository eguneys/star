import { h } from 'snabbdom';
import * as renderPools from './pools';
import renderRealtime from './realtime/main';
import renderTabs from './tabs';

export default function(ctrl) {
  let body, data = {};

  switch(ctrl.tab) {
  case 'pools':
    body = renderPools.render(ctrl);
    data = { hook: renderPools.hooks(ctrl) };
    break;
  case 'real_time':
    body = renderRealtime(ctrl);
  }

  return h('div.lobby__app', [
    h('div.tabs-horiz', renderTabs(ctrl)),
    h('div.lobby__app__content.l' + ctrl.tab, data, body)
  ]);
}
