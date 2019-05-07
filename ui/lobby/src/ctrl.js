import LobbySocket from './socket';

export default function LobbyController(opts, redraw) {
  
  this.opts = opts;
  this.pools = opts.pools;
  this.redraw = redraw;

  this.socket = new LobbySocket(opts.socketSend, this);
  
  this.trans = opts.trans;
}
