import * as xhr from './xhr';
import LobbySocket from './socket';

export default function LobbyController(opts, redraw) {
  
  this.opts = opts;
  this.data = opts.data;
  this.pools = opts.pools;
  this.redraw = redraw;

  this.socket = new LobbySocket(opts.socketSend, this);
  
  this.trans = opts.trans;

  this.clickPool = (id) => {
    if (!this.data.me) {
      xhr.anonPoolSeek(this.pools.find(p => p.id === id));
    } else if (this.poolMember && this.poolMember.id === id) this.leavePool();
    else {
      this.enterPool({ id });
      this.redraw();
    }
  };

  this.enterPool = (member) => {
    this.poolMember = member;
    this.poolIn();
  };

  this.leavePool = () => {
    if (!this.poolMember) return;
    this.socket.poolOut(this.poolMember);
    this.poolMember = undefined;
    this.redraw();
  };

  this.poolIn = () => {
    if (!this.poolMember) return;
    this.socket.poolIn(this.poolMember);
  };
}
