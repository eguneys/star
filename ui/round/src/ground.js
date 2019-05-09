import { City } from 'city';

import { h } from 'snabbdom';
import * as util from './util';

export function makeConfig(ctrl) {
  const data = ctrl.data;
  return {
    
  };
}

export function render(ctrl) {
  return h('div.cg-board-wrap', {
    hook: util.onInsert(el => ctrl.setStarground(City(el, makeConfig(ctrl))))
  }, [
    h('div.cg-board')
  ]);

}
