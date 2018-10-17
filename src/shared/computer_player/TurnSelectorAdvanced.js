class TurnSelectorAdvanced {
  static call(turn) {
  /*  Math.min(...array); finds min value of an array called array */
    
    const worstNextTurn = turn.map(turn => getWorstValue(turn));

    let bestTurn = worstNextTurn[0];
      for (let i = 0; i < worstNextTurn.length; i++) {
        if (bestTurn.value < worstNextTurn[i].value) {
          bestTurn = worstNextTurn[i];
        }

    /*
    turn.value = scores.map Math.min(...scores));
    
    const bestTurn = turn.reduce((acc, turn) => {
      if (acc === undefined) acc = turn;
      if (acc.value < turn.furtherTurns.value) acc = turn;
      return acc;
    }, undefined); */
  }

 static getWorstValue(turn) {
    const scores = turn.furtherTurn.map(value => value.value);
    const worstValue = Math.min(...scores);
    return worstValue;
  }
}

export default TurnSelectorAdvanced;
