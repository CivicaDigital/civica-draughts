class TurnSelectorAdvanced {
  static call(turn) {
    const worstNextTurn = turn.map(x => TurnSelectorAdvanced.getWorstValue(x));

    let bestTurn = worstNextTurn[0];
    for (let i = 0; i < worstNextTurn.length; i++) {
      if (bestTurn.value < worstNextTurn[i].value) {
        bestTurn = worstNextTurn[i];
      }
    }
  }

  static getWorstValue(turn) {
    const scores = turn.furtherTurn.map(value => value.value);
    const worstValue = Math.min(...scores);
    return worstValue;
  }
}
export default TurnSelectorAdvanced;

/*
    turn.value = scores.map Math.min(...scores));

    const bestTurn = turn.reduce((acc, turn) => {
      if (acc === undefined) acc = turn;
      if (acc.value < turn.furtherTurns.value) acc = turn;
      return acc;
    }, undefined); */
