/**
 * retrieve the start position of the turn
 * iterate through each piece
 * check for jump moves first
 * if jump moves exist, find end positions of all jump moves
 * push the new end positions to the validmoves array
 *
 * if no jump moves exist, find end positions of all normal moves
 * push the new end positions to the validmoves array
 *
 * return the valid moves array
 */

import * as moves from '../moves';

class ValidMoveFinder {
  static movefinder(playableSquares, blackturn, origin) {
    let aimove;
    if (moves.legalJumpMoveExists(playableSquares, blackturn)) {
      aimove = moves.getLegalJumpMoves(playableSquares, origin, blackturn);
    } else {
      aimove = moves.getLegalMoves();
    }
    return aimove;
  }

  static call(boardController) {
    const pieceorigins = this.determinepieceorigins();
    const validmoves = [];
    const playableSquares = boardController.board.playableSquares;
    const blackturn = boardController.turn.blackturn;
    pieceorigins.forEach((element) => {
      const origin = boardController.board.playableSquares[element];
      const aimove = moves.getLegalMoves(playableSquares, origin, blackturn);
      validmoves.push(aimove);
    });
    return validmoves;
  }

  static determinepieceorigins(boardController) {
    const pieceorigins = [];
    const startpos = boardController.turn.startPosition;
    startpos.forEach((element, index) => {
      if (element !== 'undefined') {
        if (element.black === true) {
          pieceorigins.push(index + 1);
        }
      }
    });
    return pieceorigins;
  }
}

export default ValidMoveFinder;
