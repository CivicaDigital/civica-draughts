
import { getLegalMoves } from '../../src/shared/moves';
import { BoardController } from '../../src/client/board-controller';
import validmovefinder from '../../src/shared/computer_player/validmovefinder';

describe('validmovefinder module', () => {
  describe('when it is the ais turn', () => {
    describe('for a simple given start position', () => {
      it('returns an array of the squares with black pieces on it', () => {
        const boardController = new BoardController(8);
        const fen = 'W:W5:B1,2,3,15';
        /** const turn = turns.getTurnFromFen(fen); */
        boardController.startGame(fen);
        const pieceorigins = validmovefinder.determinepieceorigins(boardController);
        expect(pieceorigins).toEqual([1, 2, 3, 15]);
      });
      it('returns an array of arrays of the endpositions of the possible legal moves', () => {
        const boardController = new BoardController(8);
        const fen = 'W:W10:B1,2,3,4';
        boardController.startGame(fen);
        const validturns = validmovefinder.call(boardController);
        const validturnslength = validturns.length;
        expect(validturnslength).toEqual(7);
      });
    });
    describe('for a simple given start position with 2 possible jump moves', () => {
      it('returns an array of arrays of the endpositions of the possible legal moves', () => {
        const boardController = new BoardController(8);
        const fen = 'W:W6,15:B1,2,3,4';
        boardController.startGame(fen);
        const validturns = validmovefinder.call(boardController);
        const validturnslength = validturns.length;
        console.log(validturns[1].moves[1]);
        expect(validturnslength).toEqual(2);
      });
    });
  });
});
