var Game = require('./Game');
var Player = require('./Player');

var { Game: StarGame, Side, Status } = require('jscity');

const F = {
  Game: {
    id: '_id',
    playerIds: 'ps',
    createdAt: 'ca',
    player1: 'p1',
    player2: 'p2',
    turns: 't',
    status: 's',
    binaryStreaks: 'bs',
    binaryTolls: 'bt',
    binaryPlayers: 'bp',
    binaryPrompt: 'br'
  },
  Player: {
    id: '_id',
    side: 's',
    aiLevel: 'a'
  }
};

const playerBSONHandler = {
  read(bson) {
    return (new Player({
      id: bson[F.Player.id],
      side: bson[F.Player.side],
      aiLevel: bson[F.Player.aiLevel]
    }));
  },
  write(player) {
    return {
      [F.Player.id]: player.id,
      [F.Player.side]: player.side,
      [F.Player.aiLevel]: player.aiLevel
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

    var turns = bson[F.Game.turns];
    var status = Status.make(bson[F.Game.status]);
    var turnColor = Side.fromTurns(turns);

    var decoded = {
      streaks: bson[F.Game.binaryStreaks],
      tolls: bson[F.Game.binaryTolls],
      players: bson[F.Game.binaryPlayers],
      prompt: bson[F.Game.binaryPrompt]
    };

    var starGame = new StarGame({
      streaks: decoded.streaks,
      tolls: decoded.tolls,
      players: decoded.players,
      prompt: decoded.prompt,
      turnColor: turnColor,
      turns: turns
    });

    return (new Game({
      id: bson[F.Game.id],
      player1: makePlayer(F.Game.player1, 'player1', p1Id),
      player2: makePlayer(F.Game.player2, 'player2', p2Id),
      star: starGame,
      status: status,
      createdAt: bson[F.Game.createdAt]
    }));
  },
  write(o) {
    return {
      ...{
        [F.Game.id]: o.id,
        [F.Game.playerIds]: (o.player1.id + o.player2.id),
        [F.Game.player1]: playerBSONHandler.write(o.player1),
        [F.Game.player2]: playerBSONHandler.write(o.player2),
        [F.Game.status]: o.status.id,
        [F.Game.turns]: o.star.turns,
        [F.Game.createdAt]: o.createdAt,
      },
      ...{
        [F.Game.binaryStreaks]: o.board().streaks,
        [F.Game.binaryTolls]: o.board().tolls,
        [F.Game.binaryPlayers]: o.board().players,
        [F.Game.binaryPrompt]: o.board().prompt,
      }
    };
  }
};

module.exports = {
  gameBSONHandler,
  playerBSONHandler
};
