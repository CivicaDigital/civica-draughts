import GameController from '../shared/game-controller';
import * as moves from '../shared/moves';
import * as squares from '../shared/squares';

/**
 * Controls user interactions.
 * @summary Impure functions, Array.prototype.find().
 * @todo This class could become be used as a data store with an event emitter.
 */
export default class BoardController {
  /**
  * Constructor.
  * @param {number} size The width/length of the board in squares.
  */
  constructor(size) {
    /** Controller for the current game. */
    this.gameController = null;

    /** The turn's state. */
    this.turn = null;

    /** The current board's state. */
    this.board = squares.createBoardFromPosition(size, null);
  }

  /**
  * Handles a square on the board being clicked, selecting or moving its piece as appropriate.
  * @param {Square} square The square that was clicked.
  */
  squareClicked(square) {
    if (square.piece && square.piece.black === this.turn.blackTurn) {
      this.selectSquareAndHighlightMoves(this.board.playableSquares, square);
    } else {
      const previousSquare = this.board.playableSquares.find(sq => sq.selected);
      // If a square with a piece in was selected previously
      if (previousSquare && previousSquare.piece) {
        // Make move if possible and return updated turn object, or a new turn if move ended previous one
        this.turn = this.gameController.makeMove(this.board.playableSquares,
          this.board.size,
          previousSquare,
          square);
        const movesCount = this.turn.moves.length;

        // Get the end position of the previous move of this turn, or the turn start position if new turn
        const position = movesCount ? this.turn.moves[movesCount - 1].endPosition : this.turn.startPosition;

        // Set state following move
        this.board = squares.createBoardFromPosition(this.board.size, position);
      }
    }
  }

  /**
  * Start a new game at the position described by the supplied fen.
  * @param {string} fen The FEN describing the position of the pieces and the player whose turn it is.
  * @returns {Array<Array<Square>>} A representation of the board, made up of playable/non-playable squares.
  */
  startGame(fen) {
    this.gameController = new GameController();
    this.turn = this.gameController.getFirstTurn(fen);
    this.board = squares.createBoardFromPosition(this.board.size, this.turn.startPosition);
    return this.board.squares;
  }

  /**
  * Highlights legal moves for the supplied square and, if at least one found, selects the square.
  * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
  * @param {Square} square The square to be selected.
  */
  selectSquareAndHighlightMoves(playableSquares, square) {
    BoardController.deselectAndUnhighlightAllSquares(playableSquares);
    let atLeastOneMove = false;
    moves.getLegalMoves(playableSquares, square, this.turn.blackTurn)
      .forEach((move) => {
        atLeastOneMove = true;
        playableSquares[move.destination - 1].highlighted = true;
      });
    if (atLeastOneMove) {
      square.selected = true;
    }
  }

  /**
  * Removes all highlighting and selection from board squares.
  * @param {Array<Square>} playableSquares The playable squares of the board, indexed as per their identifier.
  */
  static deselectAndUnhighlightAllSquares(playableSquares) {
    for (const square of playableSquares) {
      square.selected = false;
      square.highlighted = false;
    }
  }
}
