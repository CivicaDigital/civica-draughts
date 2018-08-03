/**
* Unit tests for the moves module.
* @summary Basic unit testing.
*/
import * as moves from '../../src/shared/moves';
import * as data from '../../src/shared/data-types';

describe('moves module', () => {
  describe('pieceCanMoveInThisDirection function', () => {
    describe('when the pieces is a white king', () => {
      it('returns true when the move is down the board', () => {
        // Arrange
        const origin = new data.Square(true, 1);
        origin.piece = new data.Piece(false, true);
        const destination = new data.Square(true, 5);

        const result = moves.pieceCanMoveInThisDirection(origin, destination); // Act
        expect(result).toEqual(true); // Assert
      });

      it('returns true when the move is up the board', () => {
        // Arrange
        const origin = new data.Square(true, 5);
        origin.piece = new data.Piece(false, true);
        const destination = new data.Square(true, 1);

        const result = moves.pieceCanMoveInThisDirection(origin, destination); // Act
        expect(result).toEqual(true); // Assert
      });
    });

    describe('when the pieces is a black king', () => {
      it('returns true when the move is down the board', () => {
        // Arrange
        const origin = new data.Square(true, 1);
        origin.piece = new data.Piece(true, true);
        const destination = new data.Square(true, 5);

        const result = moves.pieceCanMoveInThisDirection(origin, destination); // Act
        expect(result).toEqual(true); // Assert
      });

      it('returns true when the move is up the board', () => {
        // Arrange
        const origin = new data.Square(true, 5);
        origin.piece = new data.Piece(true, true);
        const destination = new data.Square(true, 1);

        const result = moves.pieceCanMoveInThisDirection(origin, destination); // Act
        expect(result).toEqual(true); // Assert
      });
    });
  });
});
