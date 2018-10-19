export class boardScorer {
  /**
   * Calculates the total value of pieces on the board when given a turn object.
   * @param {Turn} turn The turn object describing the position of the pieces and the player to move.
   * @returns {boardValue} The value of the board.
   */
  static call(turn) {
    const endPos = turn.moves[turn.moves.length - 1].endPosition;
    const pieceValues = endPos.map(boardScorer.colourKingCheck);
    const boardValue = pieceValues.reduce((a, b) => a + b, 0);
    return boardValue;
  }

  /**
   * Checks the colour and king-ness of a piece and returns an associated value.
   * @param {Piece} piece Represents the state of a piece, indicating the colour of the piece and whether it's a king.
   * @returns {pieceValue} The value of the piece.
   */
  static colourKingCheck(piece) {
    let pieceValue = 1;
    if (piece.king) {
      pieceValue = 2;
    }
    if (!piece.black) {
      pieceValue *= -1;
    }
    return pieceValue;
  }
}
