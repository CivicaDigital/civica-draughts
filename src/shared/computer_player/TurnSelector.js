class TurnSelector {
  static call(turn) {
    if (turn.length > 0) {
      let bestTurn = turn[0];
      for (let i = 0; i < turn.length; i++) {
        if (bestTurn.value < turn[i].value) {
          bestTurn = turn[i];
        }
      }
      return bestTurn.turn;
    }
    return undefined;
  }
}

export default TurnSelector;
