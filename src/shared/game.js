import * as moves from './moves';
import * as turns from './turns';
import * as squares from './squares';
import { Piece, Turn } from './data-types';

/**
* Represents a game of draughts including turn history.
* @summary Instantiating class instances, Array.prototype.reduce().
* @todo Make men into kings when they get to last row. Check for victory condition.
* Get opponent move from server - maybe move this class to server and change first parameter of makeMove() to
* be position to minimise data sent or use turns object if stateless.
*/
export default class Game {
  /**
  * Constructor.
  * @param {number} boardSize The width/length of the board in squares.
  * @param {string} fen The FEN describing the position of the pieces and the player whose turn it is.
  */
  constructor(boardSize, fen) {
    /** The width/length of the board in squares. */
    this.boardSize = boardSize;
    const turn = turns.getFirstTurn(fen);

    /** A record of the turns of the game so far. */
    this.turns = [turn];
  }

  /**
  * Gets the first turn of the new game.
  * @returns {Turn} The first turn of the game.
  */
  getFirstTurn() {
    return this.turns[0];
  }

  /**
  * Moves the piece from the origin to the destination, providing the move is valid.
  * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
  * @param {Square} origin The square on which the piece currently resides.
  * @param {Square} destination The destination square of the move.
  * @returns {Turn} The current turn, if there are more moves to make; otherwise, a new turn.
  */
  makeMove(playableSquares, origin, destination) {
    let turn = this.turns[this.turns.length - 1];
    const move = moves.makeMove(playableSquares, origin, destination, turn.blackTurn);
    if (move) {
      turn.moves.push(move);
      const postMoveSquares = squares.createSquaresFromPosition(this.boardSize, move.endPosition);
      const postMovePlayableSquares = squares.getPlayableSquares(postMoveSquares);
      const postMoveOrigin = postMovePlayableSquares[destination.identifier - 1];
      if (!move.jumped
        || moves.getLegalJumpMoves(postMovePlayableSquares, postMoveOrigin, turn.blackTurn).length === 0) {
        turn = this.getNewTurn(turn.blackTurn, move.endPosition);
      }
    }
    return turn;
  }

  /**
  * Gets a new turn from the end position of the previous turn and adds to turn history.
  * @param {boolean} blackTurn A value indicating whether it was black's turn to move in the ending turn.
  * @param {Array<Piece>} position The pieces, indexed in accordance with the square they are on.
  * @returns {Turn} A new turn, with a start position cloned from the end position of the previous turn.
  */
  getNewTurn(blackTurn, position) {
    // Clone pieces to retain state of originals
    const newTurn = new Turn(
      !blackTurn,
      position.map(piece => new Piece(piece.black, piece.king))
    );
    this.turns.push(newTurn); // Add to turn history
    return newTurn;
  }
}
