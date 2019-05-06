import { h } from 'snabbdom';
import * as renderPools from './pools';

function renderTabs(ctrl) {
  return [
    h('span.active', {
    }, ctrl.trans.noarg('quickPairing'))
  ];
}

export default function(ctrl) {
  let body, data;

  body = renderPools.render(ctrl);
  data = { hook: renderPools.hooks(ctrl) };

  return h('div.lobby__app', [
    h('div.tabs-horiz', renderTabs(ctrl)),
    h('div.lobby__app__content.lpools', data, body)
  ]);
}
