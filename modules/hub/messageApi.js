exports.map = {
  Tell: (id, msg) => ({
    type: 'tell', id, msg
  })
};

exports.round = {
  FishnetPlay: (uci) => ({
    type: 'fishnetplay', uci
  })
};
