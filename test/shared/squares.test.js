import * as squares from '../../src/shared/squares';

describe('Squares module', () => {
  describe('isEven Test', () => {
    describe('When value passed is even', () => {
      it('Returns a true result', () => {
        const result = squares.isEven(2);
        expect(result).toEqual(true);
      });
      describe('When value passed is odd', () => {
        it('Returns a false result', () => {
          const result = squares.isEven(3);
          expect(result).toEqual(false);
        });
      });
    });
  });

  describe('createSquares test', () => {
    describe('When squares are created', () => {
      it('returns true if squares match expected result of size 2', () => {
        testSquare [-1] [2];


      }
    });
  });
});
