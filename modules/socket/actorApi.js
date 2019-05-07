const SocketEnter = { type: 'socketenter' };
const SocketLeave = { type: 'socketleave' };

const Broom = { type: 'broom' };

const PopulationTell = { type: 'populationtell' };

const NbMembers = function(nb) {
  return { type: 'nbMembers', nb };
};

module.exports = {
  SocketEnter,
  SocketLeave,
  PopulationTell,
  NbMembers,
  Broom
};
