/**
 * Unit tests for the board-scorer module.
 * @summary Basic unit testing.
 */

import * as turnscore from '../../src/shared/computer_player/turn-scorer';
import { getTurnFromFen } from '../../src/shared/turns';

describe('turn-scorer module', () => {
  describe('turnScore function', () => {
    describe('when a valid board state exists with multiple turn choices available', () => {
      it('calculates and returns an array of possible turns with their associated value, white turn', () => {
        // Arrange

        /** Start Position Board layout
         * |##| 1|##| 2|##| 3|##| 4|
         * | 5|##| 6|##| 7|##| B|##|
         * |##| B|##|10|##|11|##|12|
         * |13|##| W|##|15|##|B |##|
         * |##|B |##|B |##|19|##|20|    //  Value: 3
         * |21|##|W |##|23|##|B |##|
         * |##|25|##|26|##|27|##|W |
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 1 Board layout
         * |##| 1|##| 2|##| 3|##| 4|
         * | 5|##| W|##| 7|##| B|##|
         * |##| 9|##|10|##|11|##|12|   //  Here 2 black pawns are
         * |13|##| W|##|15|##|B |##|   //  removed and no white
         * |##|17|##|B |##|19|##|20|   //  kings made
         * |21|##|22|##|23|##|B |##|
         * |##|25|##|26|##|27|##|W |   //  Value: 1
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 2 Board layout
         * |##| 1|##| 2|##| 3|##| 4|
         * | W|##| 6|##| 7|##| B|##|
         * |##| 9|##|10|##|11|##|12|   // Here 1 black pawn
         * |13|##|14|##|15|##|B |##|   // is removed, no white
         * |##|B |##|B |##|19|##|20|   // kings made
         * |21|##|W |##|23|##|B |##|
         * |##|25|##|26|##|27|##|W |   //  Value: 2
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 3 Board layout
         * |##| 1|##| 2|##|WK|##| 4|
         * | 5|##| 6|##| 7|##| 8|##|
         * |##| B|##|10|##|11|##|12|   //  Here 3 black pawns
         * |13|##| W|##|15|##|16|##|   //  are removed, 1 white
         * |##|B |##|B |##|19|##|20|   //  king made
         * |21|##|W |##|23|##|24|##|
         * |##|25|##|26|##|27|##|28|   //  Value: -1
         * |29|##|30|##|31|##|32|##|
         */

        const fen1 = 'W:W6,14,28:B8,16,18,24';
        const turn1 = getTurnFromFen(fen1);
        const move1 = { endPosition: turn1.startPosition };
        turn1.moves.push(move1);
        const fen2 = 'W:W5,22,28:B8,16,17,18,24';
        const turn2 = getTurnFromFen(fen2);
        const move2 = { endPosition: turn2.startPosition };
        turn2.moves.push(move2);
        const fen3 = 'W:WK3,14,22:B9,17,18';
        const turn3 = getTurnFromFen(fen3);
        const move3 = { endPosition: turn3.startPosition };
        turn3.moves.push(move3);
        const posArr = [turn1, turn2, turn3];

        const result = turnscore.turnScorer.call(posArr); //  Act
        expect(result).toEqual([
          //  Assert
          { turn: turn1, value: 1 },
          { turn: turn2, value: 2 },
          { turn: turn3, value: -1 }
        ]);
      });
      it('calculates and returns an array of possible turns with their associated value, black turn', () => {
        // Arrange

        /** Start Position Board layout
         * |##|KB|##| 2|##| 3|##| 4|
         * | 5|##| W|##| W|##| 8|##|
         * |##| B|##|10|##|11|##|12|
         * |13|##|WK|##|15|##| B|##|   //  Value:  -1
         * |##|17|##|18|##| W|##|20|
         * |21|##|22|##|23|##|24|##|
         * |##|25|##|26|##|27|##|28|
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 1 Board layout
         * |##| 1|##| 2|##| 3|##| 4|
         * | 5|##| 6|##| W|##| 8|##|
         * |##| B|##|10|##|11|##|12|   //  1 white king, 1 white pawn lost
         * |13|##|14|##|15|##| B|##|
         * |##|BK|##|18|##| W|##|20|   //  Value: 2
         * |21|##|22|##|23|##|24|##|
         * |##|25|##|26|##|27|##|28|
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 2 Board layout
         * |##|KB|##| 2|##| 3|##| 4|
         * | 5|##| W|##| W|##| 8|##|
         * |##| 9|##|10|##|11|##|12|   //  1 white king lost
         * |13|##|14|##|15|##| B|##|
         * |##|17|##| B|##| W|##|20|   //  Value:  1
         * |21|##|22|##|23|##|24|##|
         * |##|25|##|26|##|27|##|28|
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 3 Board layout
         * |##| 1|##| 2|##|KB|##| 4|
         * | 5|##| 6|##| 7|##| 8|##|
         * |##| B|##|10|##|11|##|12|   // 2 white pawns lost
         * |13|##|WK|##|15|##| B|##|
         * |##|17|##|18|##| W|##|20|   //  Value:  1
         * |21|##|22|##|23|##|24|##|
         * |##|25|##|26|##|27|##|28|
         * |29|##|30|##|31|##|32|##|
         */

        /** End Position 4 Board layout
         * |##|KB|##| 2|##| 3|##| 4|
         * | 5|##| W|##| W|##| 8|##|
         * |##| B|##|10|##|11|##|12|   //  1 white pawn lost
         * |13|##|WK|##|15|##|16|##|
         * |##|17|##|18|##|19|##|20|   //  Value:  0
         * |21|##|22|##| B|##|24|##|
         * |##|25|##|26|##|27|##|28|
         * |29|##|30|##|31|##|32|##|
         */

        const fen1 = 'B:B9,16,K17:W7,19';
        const turn1 = getTurnFromFen(fen1);
        const move1 = { endPosition: turn1.startPosition };
        turn1.moves.push(move1);
        const fen2 = 'B:BK1,16,18:W6,7,19';
        const turn2 = getTurnFromFen(fen2);
        const move2 = { endPosition: turn2.startPosition };
        turn2.moves.push(move2);
        const fen3 = 'B:BK3,9,16:WK14,19';
        const turn3 = getTurnFromFen(fen3);
        const move3 = { endPosition: turn3.startPosition };
        turn3.moves.push(move3);
        const fen4 = 'B:BK1,9,23:W6,7,K14';
        const turn4 = getTurnFromFen(fen4);
        const move4 = { endPosition: turn4.startPosition };
        turn4.moves.push(move4);
        const posArr = [turn1, turn2, turn3, turn4];

        const result = turnscore.turnScorer.call(posArr); //  Act
        expect(result).toEqual([
          //  Assert
          { turn: turn1, value: 2 },
          { turn: turn2, value: 1 },
          { turn: turn3, value: 1 },
          { turn: turn4, value: 0 }
        ]);
      });
    });
  });
});
