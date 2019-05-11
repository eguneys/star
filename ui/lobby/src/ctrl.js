import * as xhr from './xhr';
import * as hookRepo from './hookRepo';
import LobbySocket from './socket';

export default function LobbyController(opts, redraw) {
  this.stepHooks = [];  
  this.opts = opts;
  this.data = opts.data;
  this.data.hooks = [];
  this.pools = opts.pools;
  this.redraw = redraw;

  hookRepo.initAll(this);
  this.socket = new LobbySocket(opts.socketSend, this);

  this.tab = 'pools';
  this.trans = opts.trans;


  this.doFlushHooks = () => {
    this.stepHooks = this.data.hooks.slice(0);
    if (this.tab === 'real_time') this.redraw();
  };

  this.flushHooks = (now) => {
    if (this.flushHooksTimeout) clearTimeout(this.flushHooksTimeout);
    if (now) this.doFlushHooks();
    else {
      this.stepping = true;
      if (this.tab === 'real_time') this.redraw();
      setTimeout(() => {
        this.stepping = false;
        this.doFlushHooks();
      }, 500);
    }
    this.flushHooksTimeout = this.flushHooksSchedule();
  };

  this.flushHooksSchedule = () => {
    return setTimeout(this.flushHooks, 8000);
  };

  this.flushHooksSchedule();

  this.setTab = (tab) => {
    if (tab !== this.tab) {
      if (tab === 'real_time') this.socket.realTimeIn();
      else if (this.tab === 'real_time') {
        this.socket.realTimeOut();
        this.data.hooks = [];
      }
      this.tab = tab;
    }
  };

  this.clickAi = () => {
    xhr.anonPoolAi();
  };

  this.clickPool = (id) => {
    if (!this.data.me) {
      xhr.anonPoolSeek(this.pools.find(p => p.id === id));
      this.setTab('real_time');
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
