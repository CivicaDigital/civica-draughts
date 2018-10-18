
import { getLegalMoves } from '../../src/shared/moves';
import { BoardController } from '../../src/client/board-controller';
import validmovefinder from '../../src/shared/computer_player/validmovefinder';

describe('validmovefinder module', () => {
  describe('when it is the ais turn', () => {
    describe('for a simple given start position', () => {
      it('returns an array of the squares with black pieces on it', () => {
        function isnotEmpty(value) {
          return value !== undefined;
        }
        const boardController = new BoardController(8);
        const fen = 'W:W5:B1,2,3,15';
        /** const turn = turns.getTurnFromFen(fen); */
        boardController.startGame(fen);
        const pieceorigins = validmovefinder.determinepieceorigins(boardController);
        const filteredorigins = pieceorigins.filter(isnotEmpty);
        const result = filteredorigins.length;
        expect(result).toEqual(4);
      });
    });
    describe('for a given square with a king on it', () => {
      describe('with no other pieces adjacent', () => {
        it('returns an array of the endpositions of the possible legal moves from that square', () => {
          const boardController = new BoardController(8);
          const fen = 'W:W1:BK15';
          boardController.startGame(fen);
          const playableSquares = boardController.board.playableSquares;
          const blackturn = true;
          const element = boardController.board.playableSquares[14];
          const aimove = getLegalMoves(playableSquares, element, blackturn);
          const aimovedestinations = aimove.map(x => x.destination);
          expect(aimovedestinations).toEqual([19, 11, 18, 10]);
        });
      });
      describe('with one allied piece adjacent', () => {
        it('returns an array of the endpositions of the possible legal moves from that square', () => {
          const boardController = new BoardController(8);
          const fen = 'W:W1:BK15,19';
          boardController.startGame(fen);
          const playableSquares = boardController.board.playableSquares;
          const blackturn = true;
          const element = boardController.board.playableSquares[14];
          const aimove = getLegalMoves(playableSquares, element, blackturn);
          const aimovedestinations = aimove.map(x => x.destination);
          expect(aimovedestinations).toEqual([11, 18, 10]);
        });
      });
      describe('with 4 allied pieces adjacent', () => {
        it('returns an array of the endpositions of the possible legal moves from that square', () => {
          const boardController = new BoardController(8);
          const fen = 'W:W1:B10,11,K15,18,19';
          boardController.startGame(fen);
          const playableSquares = boardController.board.playableSquares;
          const blackturn = true;
          const element = boardController.board.playableSquares[14];
          const aimove = getLegalMoves(playableSquares, element, blackturn);
          const aimovedestinations = aimove.map(x => x.destination);
          expect(aimovedestinations).toEqual([]);
        });
      });
      describe('with 1 enemy piece adjacent', () => {
        it('returns an array of the endpositions of the possible legal moves from that square', () => {
          const boardController = new BoardController(8);
          const fen = 'W:W10:BK15';
          boardController.startGame(fen);
          const playableSquares = boardController.board.playableSquares;
          const blackturn = true;
          const element = boardController.board.playableSquares[14];
          const aimove = getLegalMoves(playableSquares, element, blackturn);
          const aimovedestinations = aimove.map(x => x.destination);
          expect(aimovedestinations).toEqual([6]);
        });
      });
      describe('with 2 enemy pieces adjacent', () => {
        it('returns an array of the endpositions of the possible legal moves from that square', () => {
          const boardController = new BoardController(8);
          const fen = 'W:W10,11:BK15';
          boardController.startGame(fen);
          const playableSquares = boardController.board.playableSquares;
          const blackturn = true;
          const element = boardController.board.playableSquares[14];
          const aimove = getLegalMoves(playableSquares, element, blackturn);
          const aimovedestinations = aimove.map(x => x.destination);
          expect(aimovedestinations).toEqual([8, 6]);
        });
      });
    });
    describe('returns an array of all of the end positions from all of the possible moves', () => {
      it('returns an array of arrays of the endpositions of the possible legal moves', () => {
        const boardController = new BoardController(8);
        const fen = 'W:W10:B1,2,3,4';
        boardController.startGame(fen);
      });
    });
  });
});
