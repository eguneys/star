import { h } from 'snabbdom';
import { render as renderGround } from '../ground';

export function main(ctrl) {

  const d = ctrl.data;

  return h('div.round__app', {
  }, [
    h('div.round__app__board.main-board', {
    }, [
      renderGround(ctrl)
    ])
  ]);

}
