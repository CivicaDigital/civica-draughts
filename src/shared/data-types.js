/**
 * Represents the state of a piece, indicating the colour of the piece and whether it's a king.
 */
export class Piece {
  /**
  * @param {boolean} black A value indicating whether the piece is black.
  * @param {boolean} king A value indicating whether the piece is a king.
  */
  constructor(black, king) {
    /** A value indicating whether the piece is black. */
    this.black = black;

    /** A value indicating whether the piece is a king. */
    this.king = king;
  }
}

/**
 * Represents a potential move from the square to which this object is attached, including
 * the move to an adjacent square and the jump move to the square following. Used to determine move validity.
 */
export class PotentialMove {
  /**
  * @param {boolean} black A value indicating whether this is black move i.e. down the board.
  * @param {number} move The unique identifier of the square immediately diagonally adjacent.
  * @param {number} jump The unique identifier of the square that can be jumped to, over the
  * square immediately diagonally adjacent.
  */
  constructor(black, move, jump) {
    /** A value indicating whether this is black move i.e. down the board. */
    this.black = black;

    /** The unique identifier of the square immediately diagonally adjacent. */
    this.move = move;

    /** The unique identifier of the square that can be jumped to, over the
     * square immediately diagonally adjacent. */
    this.jump = jump;
  }
}

/**
 * Represents the state of a square on the board, identifying its position and potential moves and UI state.
 */
export class Square {
  /**
  * @param {boolean} playable A value indicating whether the square is playable.
  * @param {number} identifier Provides a unique identifier of the square's position on the board.
  */
  constructor(playable, identifier) {
    /** A value indicating whether the square is playable - only
     * the coloured squares are used in a draughts game so white squares are unplayable. */
    this.playable = playable;

    /** Provides a unique identifier of the square's position on the board,
     * numbered from 1 at the top left and incrementing across the rows and down. Unplayable squares
     * are numbered similarly but with negative values to provide a unique key for the UI
     * @member {number} */
    this.identifier = identifier;

    /** A value indicating whether the square is currently highlighted. */
    this.highlighted = false;

    /** A value indicating whether the square is currently selected. */
    this.selected = false;

    /** The potential moves possible from the square i.e. zero,
     * one or two squares in each diagonal direction, depending on the square's position on the board. */
    this.potentialMoves = [];
  }
}

/**
 * Represents the game environment: a collection of squares, the relative positions of which define
 * the potential moves of the pieces.
 */
export class Board {
  /**
  * @param {number} size The width/length of the board in squares.
  */
  constructor(size, squares, playableSquares) {
    /** The width/length of the board in squares. */
    this.size = size;

    /** A representation of the board, made up of playable/non-playable squares indexed by their row
     * and column position. */
    this.squares = squares;

    /** The playable squares of the board, indexed based on their identifier. */
    this.playableSquares = playableSquares;
  }
}

/**
 * Represents a move, from origin to destination square, including any jumped square and
 * the resulting end position of all pieces.
 */
export class Move {
  /**
  * @param {number} origin The unique identifier of the square from which the moves starts.
  * @param {number} destination The unique identifier of the square in which the move ends.
  * @param {number} jumped The unique identifier of the square the move jumps over, if any.
  */
  constructor(origin, destination, jumped = null) {
    /** The unique identifier of the square from which the moves starts. */
    this.origin = origin;

    /** The unique identifier of the square in which the move ends. */
    this.destination = destination;

    /** The unique identifier of the square the move jumps over, if any. */
    this.jumped = jumped;

    /** The pieces at the end of this move, indexed in accordance with the square they are on. */
    this.endPosition = [];
  }
}

/**
 * Represents the state of a turn, including the moves made and the start position.
 */
export class Turn {
  /**
  * @param {boolean} blackTurn A value indicating whether it was black's turn.
  * @param {Array<Piece>} startPosition The pieces at the start of the turn, indexed
  * in accordance with the square they are on.
  */
  constructor(blackTurn, startPosition) {
    /** @param blackTurn A value indicating whether it was black's turn. */
    this.blackTurn = blackTurn;

    /** The pieces at the start of the turn, indexed in accordance with the square they are on. */
    this.startPosition = startPosition;

    /** The moves taking place within the turn. */
    this.moves = [];

    /** The state of victory */
    this.victoryState = false;
  }
}

/**
* Represents a game of draughts: the sequence of turns from the commencement of play until a win
or draw is declared.
*/
export class Game {
  /**
  */
  constructor() {
    /** The sequence of turns of the game so far. */
    this.turns = [];
  }
}
