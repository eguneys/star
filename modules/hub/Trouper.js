
class Trouper {
  constructor() {
    this.isAlive = true;
  }

  process(msg) {}

  stop() {
    this.isAlive = false;
  }

  send(msg) {
    if (this.isAlive)
      this.run(msg);
  }

  ask(makeMsg) {
    return new Promise(resolve => {
      this.send(makeMsg(resolve));
    });
  }

  run(msg) {
    if (!this.process(msg)) {
      this.fallback(msg);
    }
  }

  fallback(msg) {
    console.log("[trouper] unhandled msg", msg);
  }
}

module.exports = Trouper;
