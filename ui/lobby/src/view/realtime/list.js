import { h } from 'snabbdom';
import { bind, tds } from '../util';

function renderHook(ctrl, hook) {
  const noarg = ctrl.trans.noarg;

  return h('tr.hook.' + hook.action, {
  }, tds([
    h('span.is.is2.color-icon.random'),
    (hook.rating ? h('span.ulink.ulpt', {
    }, hook.u): noarg('anonymous')),
    h('span', {
    }, noarg(hook.ra ? 'rated': 'casual'))
  ]));
}

function isMine(hook) {
  return hook.action === 'cancel';
}

function isNotMine(hook) {
  return !isMine(hook);
}

export function render(ctrl, allHooks) {
  const mine = allHooks.find(isMine);
  const hooks = allHooks;
  const render = (hook) => renderHook(ctrl, hook);
  const standards = hooks.filter(isNotMine);
  
  const renderedHooks = [
    ...standards.map(render)
  ];

  if (mine) renderedHooks.unshift(render(mine));
  
  return h('table.hooks__list', [
    h('thead',
      h('tr', [
        h('th'),
        h('th', ctrl.trans('player')),
        h('th', ctrl.trans('mode'))
      ])
     ),
    h('tbody', {
      class: { stepping: ctrl.stepping }
    }, renderedHooks)
  ]);
};
