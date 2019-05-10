module.exports = class SocketMember {
  constructor(ws) {
    this.ws = ws;
  }
  
  push(msg) {
    this.ws.send(JSON.stringify(msg), (err) => {
      if (err) {
        console.log('[error sending]', msg, err);
      }
    });
  }

  end() {
    this.ws.terminate();
  }
};
