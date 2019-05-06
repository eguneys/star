export default function LobbyController(opts, redraw) {
  
  this.opts = opts;
  this.pools = opts.pools;
  this.redraw = redraw;

  this.trans = opts.trans;
}
