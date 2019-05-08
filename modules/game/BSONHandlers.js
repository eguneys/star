var Game = require('./Game');
var Player = require('./Player');

const F = {
  Game: {
    id: '_id',
    playerIds: 'ps',
    createdAt: 'ca',
    player1: 'p1',
    player2: 'p2'
  },
  Player: {
    id: '_id',
    side: 's'
  }
};

const playerBSONHandler = {
  read(bson) {
    return (new Player({
      id: bson[F.Player.id],
      side: bson[F.Player.side]
    }));
  },
  write(player) {
    return {
      [F.Player.id]: player.id,
      [F.Player.side]: player.side,
    };  
  }
};

const gameBSONHandler = {
  read(bson) {
    function makePlayer(field, side, id) {
      return playerBSONHandler.read(bson[field]);
    }

    var playerIds = bson[F.Game.playerIds];
    var p1Id = playerIds.slice(0, 4);
    var p2Id = playerIds.slice(4);

    return (new Game({
      id: bson[F.Game.id],
      player1: makePlayer(F.Game.player1, 'player1', p1Id),
      player2: makePlayer(F.Game.player2, 'player2', p2Id),
      createdAt: bson[F.Game.createdAt]
    }));
  },
  write(game) {
    return {
      [F.Game.id]: game.id,
      [F.Game.playerIds]: (game.player1.id + game.player2.id),
      [F.Game.player1]: playerBSONHandler.write(game.player1),
      [F.Game.player2]: playerBSONHandler.write(game.player2),      
      [F.Game.createdAt]: game.createdAt,
    };
  }
};

module.exports = {
  gameBSONHandler,
  playerBSONHandler
};
