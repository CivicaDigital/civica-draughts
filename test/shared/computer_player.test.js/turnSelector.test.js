import TurnSelector from '../../../src/shared/computer_player/TurnSelector';

describe('Turn Selection test', () => {
  describe('TurnSelection function', () => {
    describe('When presented with set of turns', () => {
      it('returns the best scoring turn', () => {
        const turn = [{ turn: 1, value: 6 }, { turn: 2, value: 3 }];
        const result = TurnSelector.call(turn); // Act
        expect(result).toEqual(1); // Assert
      });
    });
    describe('When presented with identical score values', () => {
      it('returns the first value passed to it', () => {
        const turn = [{ turn: 1, value: 6 }, { turn: 2, value: 6 }];
        const result = TurnSelector.call(turn); // Act
        expect(result).toEqual(1); // Assert
      });
    });
    describe('When presented with no turns ', () => {
      it('gives a undefined result', () => {
        const turn = [{ }];
        const result = TurnSelector.call(turn); // Act
        expect(result).toEqual(undefined); // Assert
      });
    });
  });
});
