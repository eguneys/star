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

module.exports = {
  Move(move, game){
    return new Move(move, game);
  }
};
