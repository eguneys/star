import * as game from 'stargame';
import notify from 'common/notification';
import { make as makeSocket } from './socket';
import { promiseSerial } from './util';


export default function RoundController(opts, redraw) {
  
  this.apiMove = (o) => {
    const d = this.data;
    d.game.turns = o.turns;
    d.game.player = o.turns % 2 === 1 ? 'player1': 'player2';

    console.log('api move', d.game.player, o.prompt);

    const activeSide = d.player.side === d.game.player;
    
    this.starcity.clearCamera();

    const actions = o.events.map(eventToAction);
    return promiseSerial(actions)
      .then(() => {
        d.game.fen.prompt = o.prompt;
        this.starcity.set({
          turnColor: d.game.player,
          turns: d.game.turns
        });
        this.showYourMoveNotification();
      });
  };
  
  const d = this.data = opts.data;
  console.log(d);

  this.opts = opts;
  this.redraw = redraw;

  this.socket = makeSocket(opts.socketSend, this);

  this.trans = star.trans(opts.i18n);

  this.makeScHooks = () => ({
      onNobuyland: onNobuyland,
      onBuyland: onBuyland,
      onRoll: onRoll,
      onSellcities: onSellcities,
      onSelectCity: onSelectCity,
      onLoad: onLoad,
  });

  this.showYourMoveNotification = () => {
    const d = this.data;
    const fen = d.game.fen;
    if (game.isPlayerTurn(d)) {
      switch(fen.prompt) {
      case 'roll':
        this.starcity.promptRoll();
        break;
      case 'buycity':
        this.starcity.promptBuyCity();
        break;
      case 'sell':
        this.starcity.promptSell(fen.needMoney);
        break;
      case 'themecity':
        this.starcity.promptSelect(fen.selectCities,
                                   'themecity');
        break;
      case 'starcity':
        this.starcity.promptSelect(fen.selectCities,
                                   'starcity');
        break;
      case 'reducetolls':
        this.starcity.promptSelect(fen.selectCities,
                                   'reducetolls');
        break;
      }
    };
  };

  this.setStarcity = (sc) => {
    this.starcity = sc;
  };

  setTimeout(this.showYourMoveNotification, 500);

  this.sendMove = (move) => {
    const socketOpts = {
      ackable: true
    };
    
    this.socket.send("move", move, socketOpts);
  };

  const onRoll = () => {
    this.sendMove({uci: 'roll'});
  };
  const onNobuyland = () => {
    this.sendMove({uci: 'nobuyland'});
  };
  const onBuyland = () => {
    this.sendMove({uci: 'nobuyland'});
  };
  const onSellcities = () => {
    this.sendMove({uci: 'nobuyland'});
  };
  const onSelectCity = () => {
    this.sendMove({uci: 'nobuyland'});
  };
  const onLoad = () => {
    
  };

  const eventToAction = event => {
    var api = this.starcity;
    if (event.tornado) {
      return () => api.tornado(event.tornado);
    }
    if (event.bomb) {
      return () => api.bomb(event.bomb);
    }
    if (event.streak) {
      return () => api.cityStreak(event.streak);
    }
    if (event.roll) {
      return () =>
      api.roll(event.roll[0], event.roll[1]);
    }
    if (event.move) {
      return () => api.move(event.move);
    }
    if (event.buy) {
      return () => api.buyCity(event.buy);
    }
    if (event.chance) {
      return () => api.chance(event.chance);
    }
    if (event.toll) {
      const showPaytoll = o.events.filter(e => !!e.bankrupt).length === 0;
      return () => api.payToll(showPaytoll);
    }
    if (event.bankrupt) {
      return () => api.bankrupt();
    }
    if (event.sell) {
      return () => api.sell(event.sell);
    }
    if (event.themecity) {
      return () => api.themecity(event.themecity);
    }
    if (event.starcity) {
      return () => api.starcity(event.starcity);
    }
    if (event.reducetolls) {
      return () => api.reducetolls(event.reducetolls);
    }
    if (event.nocity) {
      return () => api.noselect();
    }
    if (event.reduceexpire) {
      return () => api.reduceexpire(event.reduceexpire);
    }
    return () => Promise.reject("Unhandled move event " + JSON.stringify(event));
  };

}
