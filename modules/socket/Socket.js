var Socket = {
  initialPong: makeMessage("n")
};

function makeMessage(t, data) {
  return { t: t, d: data };
}

module.exports = Socket;
