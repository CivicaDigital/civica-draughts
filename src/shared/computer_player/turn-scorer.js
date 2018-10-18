import * as board from './board-scorer';

export class turnScorer {
  static call(input) {
    const turnScoreArr = input.map(key => ({
      turn: key,
      value: board.boardScorer.call(key)
    }));
    return turnScoreArr;
  }
}
