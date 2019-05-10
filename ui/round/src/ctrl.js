import * as game from 'stargame';
import notify from 'common/notification';
import { make as makeSocket } from './socket';


export default function RoundController(opts, redraw) {
  const d = this.data = opts.data;
  console.log(d);

  this.opts = opts;
  this.redraw = redraw;
  
  this.socket = makeSocket(opts.socketSend, this);

  this.trans = star.trans(opts.i18n);

  this.makeScHooks = () => ({
      onNobuyland: this.onNobuyland,
      onBuyland: this.onBuyland,
      onRoll: this.onRoll,
      onSellcities: this.onSellcities,
      onSelectCity: this.onSelectCity,
      onLoad: this.onLoad,
  });

  this.showYourMoveNotification = () => {
    const d = this.data;
    if (game.isPlayerTurn(d)) {
      switch(d.prompt) {
      case 'roll':
        this.starcity.promptRoll();
      case 'buycity':
        this.starcity.promptBuyCity();
      case 'sell':
        this.starcity.promptSell(d.needMoney);
      case 'themecity':
        this.starcity.promptSelect(d.selectCities,
                                   'themecity');
      case 'starcity':
        this.starcity.promptSelect(d.selectCities,
                                   'starcity');
      case 'reducetolls':
        this.starcity.promptSelect(d.selectCities,
                                   'reducetolls');
      }
    };
  };

  this.setStarcity = (sc) => {
    this.starcity = sc;
  };

  setTimeout(this.showYourMoveNotification, 500);

}
