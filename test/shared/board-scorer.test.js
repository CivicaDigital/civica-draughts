/**
* Unit tests for the board-scorer module.
* @summary Basic unit testing.
*/


import * as boardscore from '../../src/shared/computer_player/board-scorer';

describe('board-scorer module', () => {
  describe('scorer function', () => {
    describe('when a valid board state exists', () => {
      it('adds up the current positions of all pieces in terms of a score', () => {
        // Arrange
        const fen = 'W:W15,16,25,26,27,28,29:B1,2,3,4,5,10,12';

        boardscore.boardScorer.scorer();
      });
    });
  });
});
