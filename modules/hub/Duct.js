module.exports = class Duct {

  process() {}

  send(msg) {
    this.run(msg);
  }

  run(msg) {
    if (!this.process(msg)) {
      fallback(msg);
    }
  }
};

var fallback = (msg) => {
  console.log("[duct]", `unhandled msg ${JSON.stringify(msg)}`);
};
