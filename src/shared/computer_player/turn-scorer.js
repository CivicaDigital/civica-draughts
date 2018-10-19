import * as board from './board-scorer';

/**
 * Calculates the total value of each board for an array of turn objects.
 * @param {Array<Turn>} possibleTurns An array of turn objects describing the position of the pieces and the player to move.
 * @returns {possibleTurnValues} An arrange of turns representing possible moves with their associated board value.
 */
export class turnScorer {
  static call(possibleTurns) {
    const possibleTurnValues = possibleTurns.map(key => ({
      turn: key,
      value: board.boardScorer.call(key)
    }));
    return possibleTurnValues;
  }
}
