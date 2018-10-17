export class boardScorer {
  static scorer(turninput) {
    const boardState = turninput.turn.startPosition;
    var scoreCheckArr = boardState.map(colourKingCheck);
    var totalScore = scoreCheckArr.reduce((a, b) => a + b, 0);
    return totalScore;
  }
  static function colourKingCheck(turninput){
    let score = 1;
    if (turninput[i].piece.king) { 
      score = 2;
    } 
    if (!turninput[i].piece.black) {
      score *= -1;
    } 
    return score;
  }
}
