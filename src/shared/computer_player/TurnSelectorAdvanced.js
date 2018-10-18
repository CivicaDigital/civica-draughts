import TurnSelector from './TurnSelector';

class TurnSelectorAdvanced {
  static call(turn) {
    if (turn.length > 0) {
      let bestPlay = turn;
      const worstNextTurn = TurnSelectorAdvanced.getOponentsBestTurn(turn);
      if (worstNextTurn !== null) {
        bestPlay = TurnSelector.call(worstNextTurn);
      } else { bestPlay = TurnSelector.call(turn); }
      return bestPlay;
    }
    return undefined;
  }

  static getWorstValue(turn) {
    const scores = turn.furtherTurn.map(value => value.value);
    const worstValue = Math.min(...scores);
    return worstValue;
  }

  static getOponentsBestTurn(turn) {
    return turn.map(x => ({ turn: x.turn, value: TurnSelectorAdvanced.getWorstValue(x) }));
  }
}
export default TurnSelectorAdvanced;
