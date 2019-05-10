module.exports = class SocketMember {
  constructor(ws) {
    this.ws = ws;
  }
  
  push(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  end() {
    this.ws.terminate();
  }
};
