/**
 * Unit tests for the board-scorer module.
 * @summary Basic unit testing.
 */

import * as boardscore from '../../src/shared/computer_player/board-scorer';
import { getTurnFromFen } from '../../src/shared/turns';

describe('board-scorer module', () => {
  describe('scorer function', () => {
    describe('when a valid board state exists', () => {
      it('adds up the current positions of all pieces in terms of a score for full board', () => {
        // Arrange
        const fen = 'W:W15,16,25,26,27,28,29:B1,2,3,4,5,10,12';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(0); //  Assert
      });

      it('adds up current positions of all pieces in terms of a score for 4White(1King, 3Men) and 2Black(1King, 1Men)', () => {
        // Arrange
        const fen = 'W:W15,16,K25,K26:B1,K2';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(-3); //  Assert
      });

      it('adds up current positions of all pieces in terms of a score for 3White(1King, 2Men) and 5Black(3King, 2Men)', () => {
        // Arrange
        const fen = 'W:W15,16,K25:B1,K2,K3,K4,5';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(4); //  Assert
      });

      it('adds up current positions of all pieces in terms of a score for only mixed white pieces remaining', () => {
        // Arrange
        const fen = 'W:W15,16,17,K25,K26,27,K28,K29:B';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(-12); //  Assert
      });

      it('adds up current positions of all pieces in terms of a score for only mixed black pieces remaining', () => {
        // Arrange
        const fen = 'W:B15,17,K25,K26,27,K28,K29:W';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(11); //  Assert
      });

      it('adds up current positions of all pieces in terms of a score for a very large white score', () => {
        // Arrange
        const fen =          'W:WK1,K2,K3,K4,K5,K6,K7,K8,K9,K10,K11,K12,K13,K14,K15,K16,K17,K18,K19,K20,K21,K22,K23,K24,K25,K26,K27,K28,K29,K30,K31,K32:B';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(-64); //  Assert
      });
      it('adds up current positions of all pieces in terms of a score for a very large black score', () => {
        // Arrange
        const fen =          'W:BK1,K2,K3,K4,K5,K6,K7,K8,K9,K10,K11,K12,K13,K14,K15,K16,K17,K18,K19,K20,K21,K22,K23,K24,K25,K26,K27,K28,K29,K30,K31,K32:W';
        const turn = getTurnFromFen(fen);
        const move = { endPosition: turn.startPosition };
        turn.moves.push(move);
        const result = boardscore.boardScorer.call(turn); // Act
        expect(result).toEqual(64); //  Assert
      });
    });
  });
});
