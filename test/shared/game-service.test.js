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
  describe('when the undo button is clicked', () => {
    describe('if one move has been made in the current turn', () => {
      it('returns the supplied start position of that turn', () => {
        const gameService = new GameService();
        const newturn = new data.Turn(false, [1]);
        const move1 = new data.Move(5, 14, 1);
        const move1endpos = 2;
        move1.endPosition.push(move1endpos);
        newturn.moves.push(move1);
        gameService.game.turns.push(newturn);
        const result = gameService.undoMove();
        expect(result).toEqual([1]);
      });
    });
    describe('if more than one move has been made in the current turn', () => {
      it('returns the supplied end position of the previous move ', () => {
        const gameService = new GameService();
        const newturn = new data.Turn(false, 'W:W5,K29:B1,2');
        const move1 = new data.Move(5, 14, 1);
        const move1endpos = 2;
        move1.endPosition.push(move1endpos);
        newturn.moves.push(move1);
        const move2 = new data.Move(5, 14, 1);
        const move2endpos = 3;
        move2.endPosition.push(move2endpos);
        newturn.moves.push(move2);
        gameService.game.turns.push(newturn);
        const result = gameService.undoMove();
        expect(result).toEqual([2]);
      });
    });
    describe('if there have been no moves in the current turn', () => {
      it('deletes the current turn, returning turn length of 1', () => {
        const gameService = new GameService();
        const newturn1 = new data.Turn(false, 'W:W5,K29:B1,2');
        const move1 = new data.Move(5, 9, 1);
        const move1endpos = 2;
        move1.endPosition.push(move1endpos);
        newturn1.moves.push(move1);
        gameService.game.turns.push(newturn1);
        const newturn2 = new data.Turn(false, 'W:W9,K29:B1,2');
        gameService.game.turns.push(newturn2);
        const result = gameService.makeUndo();
        expect(result).toEqual(1);
      });
    });
    describe('if there has been a move in the current turn', () => {
      it('does not delete the current turn, returning turn length of 2', () => {
        const gameService = new GameService();
        const newturn1 = new data.Turn(false, 'W:W5,K29:B1,2');
        const move1 = new data.Move(5, 9, 1);
        const move1endpos = 2;
        move1.endPosition.push(move1endpos);
        newturn1.moves.push(move1);
        gameService.game.turns.push(newturn1);
        const newturn2 = new data.Turn(false, 'W:W9,K29:B1,2');
        const move2 = new data.Move(5, 14, 1);
        const move2endpos = 2;
        move2.endPosition.push(move2endpos);
        newturn2.moves.push(move2);
        gameService.game.turns.push(newturn2);
        const result = gameService.makeUndo();
        expect(result).toEqual(2);
      });
    });
  });
});
