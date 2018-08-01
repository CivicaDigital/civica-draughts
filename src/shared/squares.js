/**
* Helper functions for setting up a representation of the board, with valid potential moves.
* @summary Instantiating class instances, Array.prototype.reduce().
* @todo The valid potential moves could instead be calculated on the fly or squares only created once.
*/

import { Square, PotentialMove, Board } from './data-types';

/**
 * Checks that the vector supplied represents a move to a square that exists on the board and,
 * if so, returns the destination square's identifier.
 * @param {Array<Array<Square>>} squares The playable squares that make up the board.
 * @param {number} columnIndex The index of the column from which the move originates.
 * @param {number} rowIndex The index of the row from which the move originates.
 * @param {number} xmodifier The column modifier of the move i.e. the number of squares left or right.
 * @param {number} ymodifier The row modifier of the move i.e. the number of squares up or down.
 * @returns {Square} The destination square identifier, if the move is valid, or null otherwise.
 */
function getMove(squares, columnIndex, rowIndex, xmodifier, ymodifier) {
  const row = squares[rowIndex + ymodifier];
  if (row) {
    const destinationSquare = row[columnIndex + xmodifier];
    if (destinationSquare) {
      return destinationSquare.identifier;
    }
  }
  return null;
}

/**
 * Gets any valid move and jump in the specified direction on the board.
 * @param {Array<Array<Square>>} squares The squares that make up the board.
 * @param {number} columnIndex The index of the column of the square from which the move originates.
 * @param {number} rowIndex The index of the row of the square from which the move originates.
 * @param {number} xdirection The horizontal direction of the move: positive = right, negative = left.
 * @param {number} ydirection The vertical direction of the move: positive = up, negative = down.
 * @returns {PotentialMove} Object defining the potential move and jump in the specified direction.
 */
function getMoves(squares, columnIndex, rowIndex, xdirection, ydirection) {
  const potentialMove = new PotentialMove(ydirection < 0, // Black move is down
    getMove(squares, columnIndex, rowIndex, xdirection, ydirection),
    getMove(squares, columnIndex, rowIndex, xdirection * 2, ydirection * 2));
  return potentialMove;
}

/**
 * Sets the valid moves on the squares of the board, for verification of legal moves later.
 * @param {Array<Array<Square>>} squares The squares that make up the board.
 */
function setPotentialMoves(squares) {
  for (let i = 0; i < squares.length; i++) {
    const row = squares[i];
    for (let j = 0; j < row.length; j++) {
      const square = row[j];
      if (square.playable) {
        square.potentialMoves.push(getMoves(squares, j, i, 1, 1));
        square.potentialMoves.push(getMoves(squares, j, i, 1, -1));
        square.potentialMoves.push(getMoves(squares, j, i, -1, 1));
        square.potentialMoves.push(getMoves(squares, j, i, -1, -1));
      }
    }
  }
}

/**
 * Determines whether the supplied number if even.
 * @param {number} n The number to check.
 * @returns {boolean} A value indicating whether the supplied number is even.
 */
function isEven(n) {
  return n % 2 === 0;
}

/**
 * Creates the squares that make up the board.
 * @param {number} size The width/length of the board in squares.
 * @returns {Array<Array<Square>>} A representation of the board, made up of playable/non-playable squares
 * indexed by their row and column position.
 */
function createSquares(size) {
  let playableId = 0; // Playable square have a positive unique identifier
  let unplayableId = -1; // Non-playable squares have a negative unique identifier
  const squares = new Array(size);
  for (let i = 1; i <= size; i++) { // each row in the board
    squares[i - 1] = new Array(size);
    const evenRow = isEven(i);
    for (let j = 1; j <= size; j++) { // each square in the row
      const square = new Square(
        false,
        unplayableId
      );
      squares[i - 1][j - 1] = square;
      // Square row/column position determines whether it is a playable square
      if (evenRow ^ isEven(j)) {
        playableId++;
        square.playable = true;
        square.identifier = playableId;
      } else {
        unplayableId--;
      }
    }
  }
  setPotentialMoves(squares);
  return squares;
}

/**
 * Gets the playable squares from the complete board.
 * @param {Array<Array<Square>>} squares The squares that make up the board.
 * @returns {Array<Square>} The playable squares of the board, indexed based on their identifier.
 */
function getPlayableSquares(squares) {
  return squares.reduce((accumulator, items) => {
    for (const square of items) {
      if (square.identifier > 0) {
        accumulator[square.identifier - 1] = square;
      }
    }
    return accumulator;
  }, []);
}

/**
 * Creates a new version of the board and places the pieces on it.
 * @param {number} size The width/length of the board in squares.
 * @param {Array<Piece>} position The current pieces, indexed in accordance with the square they are on.
 * @returns {Board} A representation of the board, its squares and their pieces.
 */
export function createBoardFromPosition(size, position) {
  const squares = createSquares(size);
  const playableSquares = getPlayableSquares(squares);
  if (position) {
    for (let i = 0; i < position.length; i++) {
      playableSquares[i].piece = position[i];
    }
  }
  return new Board(size, squares, playableSquares);
}
