export class boardScorer {
  static call(turninput) {
    const boardStateArr = turninput.startPosition; // const boardStateArr = turninput.moves[moves.length-1].endPosition;
    const scoreCheckedArr = boardStateArr.map(boardScorer.colourKingCheck);
    const totalScore = scoreCheckedArr.reduce((a, b) => a + b, 0);
    return totalScore;
  }

  static colourKingCheck(input) {
    let score = 1;
    if (input.king) {
      score = 2;
    }
    if (!input.black) {
      score *= -1;
    }
    return score;
  }
}
