import TurnSelector from './TurnSelector';

class TurnSelectorAdvanced {
  static call(turn) {
    const worstNextTurn = turn.map(x => ({ turn: x.turn, value: TurnSelectorAdvanced.getWorstValue(x) }));
    const bestPlay = TurnSelector.call(worstNextTurn);
    return bestPlay;
  }

  static getWorstValue(turn) {
    const scores = turn.furtherTurn.map(value => value.value);
    const worstValue = Math.min(...scores);
    return worstValue;
  }
}
export default TurnSelectorAdvanced;
