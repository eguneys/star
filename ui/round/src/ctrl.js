import { make as makeSocket } from './socket';

export default function RoundController(opts, redraw) {

  const d = this.data = opts.data;

  this.opts = opts;
  this.redraw = redraw;
  
  this.socket = makeSocket(opts.socketSend, this);

}
