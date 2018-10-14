/**
* Unit tests for the game-service module.
* @summary Basic unit testing and mocking.
*/
import { GameService } from '../../src/shared/game-service';
import * as moves from '../../src/shared/moves';
import * as data from '../../src/shared/data-types';

jest.mock('../../src/shared/moves'); // Mock the moves dependency

describe('game-service module', () => {
  describe('makeMove function', () => {
    describe('when a valid simple move is made', () => {
      it('adds the move to the current turn and returns a new turn', () => {
        // Arrange
        const move = new data.Move(1, 6);
        const endPosition = [];
        const piece1 = new data.Piece(true, true);
        const piece2 = new data.Piece(false, true);
        endPosition[2] = piece1;
        endPosition[6] = piece2;
        move.endPosition = endPosition;
        moves.makeMove.mockReturnValue(move);
        const gameService = new GameService();
        const firstTurn = gameService.getFirstTurn();

        const result = gameService.makeMove(null,
          8,
          new data.Square(true, 1),
          new data.Square(true, 6)); // Act

        // Assert
        expect(firstTurn.blackTurn).toEqual(false);
        expect(firstTurn.moves).toHaveLength(1);
        expect(firstTurn.moves[0]).toEqual(move);
        expect(result.blackTurn).toEqual(true);
        expect(result.moves).toHaveLength(0);
        expect(result.startPosition[2]).toEqual(piece1);
        expect(result.startPosition[6]).toEqual(piece2);
        expect(result).not.toEqual(firstTurn);
      });
    });
    describe('when a valid jump move is made with further jump moves then possible', () => {
      it('adds the move to the current turn and returns the current turn', () => {
        // Arrange
        const move = new data.Move(1, 10, 6);
        const endPosition = [];
        const piece1 = new data.Piece(true, true);
        const piece2 = new data.Piece(false, true);
        endPosition[2] = piece1;
        endPosition[10] = piece2;
        move.endPosition = endPosition;
        moves.makeMove.mockReturnValue(move);
        moves.getLegalJumpMoves.mockReturnValue([new data.Move(10, 19, 15)]);
        const gameService = new GameService();
        const firstTurn = gameService.getFirstTurn();

        const result = gameService.makeMove(null,
          8,
          new data.Square(true, 1),
          new data.Square(true, 10)); // Act

        // Assert
        expect(result.blackTurn).toEqual(false);
        expect(result.moves).toHaveLength(1);
        expect(result.moves[0]).toEqual(move);
        expect(result).toEqual(firstTurn);
      });
    });
  });
});
