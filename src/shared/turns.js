/**
* Functions for extracting position objects from FEN.
* @demonstrates ES6 fat arrow functions, a regex.
* @potential Make the default position work for board sizes that are not 8x8. Validate that supplied FEN
* has a valid number of pieces for the board size.
* @module turns
*/

import { Piece, Turn } from './data-types';

/**
 * Gets an array of pieces indexed on their position as defined by the supplied FEN.
 * @param {string} partialFenWhite The partial FEN describing the position of the white pieces.
 * @param {string} partialFenblack The partial FEN describing the position of the black pieces.
 * @returns {Array<Piece>} The pieces, identified by their positions as defined in the partial FEN.
 */
const getPieces = (partialFenWhite, partialFenblack) => {
  const pieceRegex = /(K?)(\d+)/;
  const pieces = [];
  if (partialFenWhite) {
    for (const piece of partialFenWhite.split(',')) {
      const pieceMatch = piece.match(pieceRegex);
      pieces[pieceMatch[2] - 1] = new Piece(false, !!pieceMatch[1]);
    }
  }
  if (partialFenblack) {
    for (const piece of partialFenblack.split(',')) {
      const pieceMatch = piece.match(pieceRegex);
      pieces[pieceMatch[2] - 1] = new Piece(true, !!pieceMatch[1]);
    }
  }
  return pieces;
};

/**
 * Gets a turn object, as defined by the supplied FEN.
 * @param {string} fen The FEN describing the position of the pieces and the player whose turn it is.
 * @returns {Turn} The turn object describing the position of the pieces and the player to move.
 */
export const getTurnFromFen = (fen) => {
  const fenRegex = /(W|B):(W|B)(K?\d+(?:,K?\d+)*):(W|B)(K?\d+(?:,K?\d+)*)?/;
  const match = fen && fen.match(fenRegex);
  if (match) {
    return new Turn(match[1] === 'B',
      match[2] === 'W' ? getPieces(match[3], match[5]) : getPieces(match[5], match[3]));
  }
  return null;
};

/**
 * Gets the turn object for the first turn, as defined by the supplied FEN.
 * @param {string} fen The FEN describing the position of the pieces and the player whose turn it is.
 * @returns {Turn} The turn object resulting from the FEN, with the default start position if FEN invalid.
 */
export const getFirstTurn = (fen) => {
  let position = getTurnFromFen(fen);
  if (!position) {
    // This only works for a board that is 8x8 squares
    position = getTurnFromFen('W:W25,26,27,28,29,30,31,32:B1,2,3,4,5,6,7,8');
  }
  return position;
};
