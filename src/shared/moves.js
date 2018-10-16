/**
* Functions for verifying and making of moves.
* @demonstrates Basic logic, Array.prototype.reduce(), Array.prototype.map().
* @potential Needs testing.
* @module moves
*/

import {
  Move,
  Piece,
  // This class is imported to allow navigation via documentation type definitions so:
  // eslint-disable-next-line
  Square
} from './data-types';

/**
 * Determines whether the piece at the origin can move to the destination by virtue of direction
 * or it being a king. Note that this function is only exported for unit test demonstration purposes.
 * @param {Square} origin The square on which the piece currently resides.
 * @param {Square} destination The proposed destination square.
 * @returns {boolean} A value indicating whether the piece can move to the destination square.
 */
export function pieceCanMoveInThisDirection(origin, destination) {
  return origin.piece.king
    || (origin.piece.black ^ (origin.identifier > destination.identifier));
}

/**
 * Determines the legal, simple (non-jump) moves for the piece on the origin square.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @param {Square} origin The square on which the piece currently resides.
 * @param {boolean} blackTurn A value indicating whether it is black's turn to move.
 * @returns {Array<Move>} The legal simple moves available to the piece on the origin square.
 */
function getLegalSimpleMoves(playableSquares, origin, blackTurn) {
  return origin.potentialMoves.reduce((accumulator, move) => {
    const moveDestination = move.move && playableSquares[move.move - 1];
    if (moveDestination && !moveDestination.piece
      && origin.piece.black === blackTurn
      && pieceCanMoveInThisDirection(origin, moveDestination)) {
      accumulator.push(new Move(origin.identifier, moveDestination.identifier));
    }
    return accumulator;
  }, []);
}

/**
 * Determines the legal jump moves for the piece on the origin square.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @param {Square} origin The square on which the piece currently resides.
 * @param {boolean} blackTurn A value indicating whether it is black's turn to move.
 * @returns {Array<Move>} The legal jump moves available to the piece on the origin square.
 */
export function getLegalJumpMoves(playableSquares, origin, blackTurn) {
  const legalMoves = [];
  for (const move of origin.potentialMoves) {
    const moveDestination = move.move && playableSquares[move.move - 1];
    const jumpDestination = move.jump && playableSquares[move.jump - 1];
    if (moveDestination && moveDestination.piece
      && jumpDestination && !jumpDestination.piece
      && pieceCanMoveInThisDirection(origin, jumpDestination)
      && origin.piece.black === blackTurn
      && (origin.piece.black !== moveDestination.piece.black)) {
      legalMoves.push(new Move(origin.identifier, jumpDestination.identifier, moveDestination.identifier));
    }
  }
  return legalMoves;
}

/**
 * Determines whether any legal jump moves are possible at this point.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @param {boolean} blackTurn A value indicating whether it is black's turn to move.
 * @returns {bool} A value indicating whether any legal jump moves exist.
 */
function legalJumpMoveExists(playableSquares, blackTurn) {
  for (const square of playableSquares) {
    if (square.piece
      && getLegalJumpMoves(playableSquares, square, blackTurn).length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Determines the legal moves for the piece on the origin square.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @param {Square} origin The square on which the piece currently resides.
 * @param {boolean} blackTurn A value indicating whether it is black's turn to move.
 * @returns {Array<Move>} The legal moves available to the piece on the origin square.
 */
export function getLegalMoves(playableSquares, origin, blackTurn) {
  let legalMoves = getLegalJumpMoves(playableSquares, origin, blackTurn) || [];
  if (legalMoves.length > 0) {
    return legalMoves;
  }
  if (!legalJumpMoveExists(playableSquares, blackTurn)) {
    legalMoves = getLegalSimpleMoves(playableSquares, origin, blackTurn);
  }
  return legalMoves;
}

/**
 * Gets the current position of the pieces on the board.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @returns {Array<Piece>} The pieces on the board, indexed as per the identifier of the square in
 * which they currently reside.
 */
function getPositionFromPlayableSquares(playableSquares) {
  const position = playableSquares.reduce((accumulator, square) => {
    if (square.piece) {
      accumulator[square.identifier - 1] = square.piece;
    }
    return accumulator;
  }, []);
  return position;
}

function isInKingsRow(playableSquares, destination, boardSize) {
  return playableSquares.slice(0, boardSize / 2).find(s => s.identifier === destination)
  || playableSquares.slice(boardSize / -2).find(s => s.identifier === destination);
}

/**
 * Moves the piece from the origin to the destination, providing the move is valid.
 * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
 * @param {Square} origin The square on which the piece currently resides.
 * @param {Square} destination The square on which the piece will reside following the move.
 * @param {boolean} blackTurn A value indicating whether it is black's turn to move.
 * @returns {Move} The move that was made or null if unsuccessful i.e. invalid.
 * @param {number} boardSize The length/width of the board in squares.
*/
export function makeMove(playableSquares, origin, destination, blackTurn, boardSize) {
  const move = getLegalMoves(playableSquares, origin, blackTurn)
    .find(m => m.destination === destination.identifier);
  if (move) {
    const position = getPositionFromPlayableSquares(playableSquares)
      .map(piece => new Piece(piece.black, piece.king)); // Clone objects to retain state of original
    position[destination.identifier - 1] = position[origin.identifier - 1]; // Assign to new position
    delete position[origin.identifier - 1]; // Remove from old position while keeping indexing intact
    if (move.jumped) {
      delete position[move.jumped - 1]; // Remove captured piece while keeping indexing intact
    }
    move.endPosition = position;
    if (isInKingsRow(playableSquares, destination.identifier, boardSize)) {
      position[destination.identifier - 1].king = true;
    }
  }
  return move;
}
