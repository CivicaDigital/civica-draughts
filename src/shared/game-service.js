import * as moves from './moves';
import * as turns from './turns';
import * as squares from './squares';
import { Piece, Turn, Game } from './data-types';

/**
* Controls a game.
* @demonstrates Basic logic, Array.prototype.map().
* @potential Make men into kings when they get to last row. Check for victory condition.
*/
export class GameService {
  /**
  */
  constructor() {
    /** A record of the turns of the game so far. */
    this.game = new Game();
  }

  /**
  * Gets the first turn of the new game.
  * @param {string} fen The FEN describing the position of the pieces and the player whose turn it is.
  * @returns {Turn} The first turn of the game.
  */
  getFirstTurn(fen) {
    const turn = turns.getFirstTurn(fen);
    this.game.turns.push(turn);
    return turn;
  }

  /**
  * Moves the piece from the origin to the destination, providing the move is valid.
  * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
  * @param {number} boardSize The length/width of the board in squares.
  * @param {Square} origin The square on which the piece currently resides.
  * @param {Square} destination The destination square of the move.
  * @returns {Turn} The current turn, if there are more moves to make; otherwise, a new turn.
  */
  makeMove(playableSquares, boardSize, origin, destination) {
    let turn = this.game.turns[this.game.turns.length - 1];
    const move = moves.makeMove(playableSquares, origin, destination, turn.blackTurn);
    if (move) {
      turn.moves.push(move);
      const newBoard = squares.createBoardFromPosition(boardSize, move.endPosition);
      const newMoveOrigin = newBoard.playableSquares[destination.identifier - 1];
      if (!move.jumped
        || moves.getLegalJumpMoves(newBoard.playableSquares, newMoveOrigin, turn.blackTurn).length === 0) {
        turn = this.getNewTurn(turn.blackTurn, move.endPosition);
      }
    }
    return turn;
  }

  undoMove() {
    /** if this.turn.moves.length === 1, get the start position snapshot of the turn with turn.startPosition
    * else if moves > 1, find the end position snapshot of the previous move */
    const turn = this.game.turns[this.game.turns.length - 1];
    const undoposition = turn.moves.length <= 1 ? turn.startPosition
      : turn.moves[turn.moves.length - 2].endPosition;
    /** pop the move that is being undone */
    turn.moves.pop();
    return undoposition;
  }

  makeUndo() {
  /** find if there are existing moves in the current turn
  * if none, pop current turn
  */
    const turn = this.game.turns[this.game.turns.length - 1];


    if (turn.moves.length === 0) {
      this.game.turns.pop();
    }
    /** Call undomove function: from moves.js */
    this.undoMove();


    return this.game.turns.length;
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
    this.game.turns.push(newTurn); // Add to turn history
    return newTurn;
  }
}
