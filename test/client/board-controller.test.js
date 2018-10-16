/**
 * Unit tests for the board-controller module.
 * @summary Basic unit testing.
 */

import * as data from '../../src/shared/data-types';
import { BoardController } from '../../src/client/board-controller';

describe('board-controller module', () => {
  describe('victoryCheck function', () => {
    describe('when a move completes, leaving only black pieces remaining on the board', () => {
      it('returns true', () => {
        //  Arrange

        const position = [];
        const piece1 = new data.Piece(true, false);
        const piece2 = new data.Piece(true, true);
        position[2] = piece1;
        position[6] = piece2;

        const result = BoardController.victoryCheck(position); // Act

        // Assert
        expect(result).toEqual(true);
      });
    });
    describe('when a move completes, leaving only white pieces remaining on the board', () => {
      it('returns true', () => {
        //  Arrange

        const position = [];
        const piece1 = new data.Piece(false, false);
        const piece2 = new data.Piece(false, true);
        position[2] = piece1;
        position[6] = piece2;

        const result = BoardController.victoryCheck(position); // Act

        // Assert
        expect(result).toEqual(true);
      });
    });
    describe('when a move completes, leaving both black and white piece remaining on the board', () => {
      it('returns false', () => {
        //  Arrange

        const position = [];
        const piece1 = new data.Piece(true, false);
        const piece2 = new data.Piece(false, true);
        position[2] = piece1;
        position[6] = piece2;

        const result = BoardController.victoryCheck(position); // Act

        // Assert
        expect(result).toEqual(false);
      });
    });
  });
});
