class Move {
  
  constructor(move, game) {
    this.move = move;
    this.game = game;

    this.typ = "move";
    this.data = {
      move,
      turns: game.turns,
      prompt: game.prompt,
      needMoney: game.needMoney,
      selectCities: game.selectCities,
      events: game.events
    };
  }
  
}

class End {
  constructor(winner) {
    this.winner = winner;

    this.typ = "end";
    this.data = {
      winner
    };
  }
}

module.exports = {
  Move(move, game){
    return new Move(move, game);
  },
  End(winner) {
    return new End(winner);
  }
};
