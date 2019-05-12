import { City } from 'starcity';

import { h } from 'snabbdom';
import * as util from './util';

export function makeConfig(ctrl) {
  const data = ctrl.data,
        hooks = ctrl.makeScHooks();

  return {
    players: data.game.fen.players,
    tolls: data.game.fen.tolls,
    streaks: data.game.fen.streaks,
    prompt: data.game.fen.prompt,
    turns: data.game.turns,
    playerColor: data.player.side,
    turnColor: data.game.turns % 2 === 1 ? 'player1':'player2',
    events: {
      noBuyland: hooks.onNobuyland,
      buyland: hooks.onBuyland,
      roll: hooks.onRoll,
      sellCities: hooks.onSellcities,
      selectCity: hooks.onSelectCity,
      onLoad: hooks.onLoad
    }
  };
}

export function render(ctrl) {
  return h('div.cg-board-wrap', {
    hook: util.onInsert(el => ctrl.setStarcity(City(el, makeConfig(ctrl))))
  }, [
    h('div.cg-board')
  ]);

}
