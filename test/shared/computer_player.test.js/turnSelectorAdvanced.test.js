import TurnSelectorAdvanced from '../../../src/shared/computer_player/TurnSelectorAdvanced';

describe('Advanced Turn Selection test', () => {
  describe('TurnSelectionAdvanced function', () => {
    describe('When presented with set of turns', () => {
      it('returns the best scoring turn based on the move opponent will likely make', () => {
        const turn = [{
          turn: 1,
          value: 6,
          furtherTurn: [{ turn: 1, value: -4 }, { turn: 2, value: -1 }]
        }, {
          turn: 2,
          value: 2,
          furtherTurn: [{ turn: 1, value: -3 }, { turn: 2, value: 0 }]
        }];
        const result = TurnSelectorAdvanced.call(turn); // Act
        expect(result).toEqual(2); // Assert
      });
    });
  });
});