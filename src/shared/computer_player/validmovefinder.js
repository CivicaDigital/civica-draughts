
import * as moves from '../moves';
import { Turn } from '../data-types';

class ValidMoveFinder {
  static call(boardController) {
    const pieceorigins = this.determinepieceorigins(boardController);
    const validmoves = [];
    const blackturn = true;
    pieceorigins.forEach((element) => {
      const origin = boardController.board.playableSquares[element - 1];
      const aimove = moves.getLegalMoves(
        boardController.board.playableSquares,
        origin,
        blackturn
      );
      const aimoves = aimove.map(move => [move]);
      validmoves.push(aimoves);
    });
    // check for additional jump move(s)

    // console.log(validmoves);
    const validmovesflattened = [].concat(...validmoves);
    // console.log(validmovesflattened);
    const validturns = [];
    validmovesflattened.forEach((element) => {
      const newturn = new Turn(true, boardController.turn.startposition);
      newturn.moves = element;
      validturns.push(newturn);
    });
    return validturns;
  }

  static determinepieceorigins(boardController) {
    const pieceorigins = [];
    const startpos = boardController.turn.startPosition;
    startpos.forEach((element, index) => {
      if (element !== 'undefined' && element.black === true) {
        pieceorigins.push(index + 1);
      }
    });
    return pieceorigins;
  }
}

export default ValidMoveFinder;
