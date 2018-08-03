import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from '../../src/client/App';

/**
 * @type {App}
 */

describe('App integration tests', () => {
  describe('The snapshot tests', () => {
    test('The board renders correctly when no initial position is supplied', () => {
      const tree = renderer
        .create(<App size={8} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('The board renders correctly when an initial position is supplied', () => {
      const fen = 'W:W15,16,25,26,27,28,29:B1,2,3,4,5,10,12';
      const tree = renderer
        .create(<App size={8} fen={fen} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Legal moves are highlighted correctly when a piece is selected', () => {
    /** Board layout
    * |##| 1|##| 2|##| 3|##| 4|
    * | 5|##| 6|##| 7|##| 8|##|
    * |##| 9|##|10|##|11|##|12|
    * |13|##|14|##|15|##|16|##|
    * |##|17|##|18|##|19|##|20|
    * |21|##|22|##|23|##|24|##|
    * |##|25|##|26|##|27|##|28|
    * |29|##|30|##|31|##|32|##|
    */
    describe('Simple moves with respect to piece colour', () => {
      describe('A white king can move diagonally in any direction', () => {
        let wrapper;
        beforeAll(() => {
          const fen = 'W:W5,K18:B1,2,3,4';
          wrapper = mount(<App size={8} fen={fen} />);
        });
        test('No squares are initally highlighted or selected', () => {
          expect(wrapper.find('button.selected')).toHaveLength(0);
          expect(wrapper.find('button.highlighted')).toHaveLength(0);
        });
        test('A clicked square is marked as selected and legal moves are highlighted', () => {
          wrapper.find('#square-18').simulate('click');
          wrapper.update();

          expect(wrapper.find('#square-18').hasClass('selected')).toEqual(true);
          expect(wrapper.find('button.selected')).toHaveLength(1);

          expect(wrapper.find('#square-14').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-15').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-22').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-23').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('button.highlighted')).toHaveLength(4);
        });
      });
      describe('A black king can move diagonally in any direction', () => {
        // Remember fen has to indicate black to move first e.g. 'B:W5,K18:B1,2,3,4'
      });
      describe('A white man can only move diagonally up the board', () => {
      });
      describe('A black man can only move diagonally down the board', () => {
      });
    });
    /** Board layout
    * |##| 1|##| 2|##| 3|##| 4|
    * | 5|##| 6|##| 7|##| 8|##|
    * |##| 9|##|10|##|11|##|12|
    * |13|##|14|##|15|##|16|##|
    * |##|17|##|18|##|19|##|20|
    * |21|##|22|##|23|##|24|##|
    * |##|25|##|26|##|27|##|28|
    * |29|##|30|##|31|##|32|##|
    */
    describe('Simple moves with respect to the edge of the board', () => {
      describe('From the bottom-left corner, a white king can only move up-right', () => {
        let wrapper;
        beforeAll(() => {
          const fen = 'W:W5,K29:B1,2,3,4';
          wrapper = mount(<App size={8} fen={fen} />);
        });
        test('No squares are initally highlighted or selected', () => {
          expect(wrapper.find('button.selected')).toHaveLength(0);
          expect(wrapper.find('button.highlighted')).toHaveLength(0);
        });
        test('A clicked square is marked as selected and legal moves are highlighted', () => {
          wrapper.find('#square-29').simulate('click');
          wrapper.update();

          expect(wrapper.find('#square-29').hasClass('selected')).toEqual(true);
          expect(wrapper.find('button.selected')).toHaveLength(1);

          expect(wrapper.find('#square-25').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('button.highlighted')).toHaveLength(1);
        });
      });
      describe('From the top-right corner, a white king can only move down-left', () => {
      });
      describe('From the bottom-left corner, a black king can only move up-right', () => {
      });
      describe('From the top-right corner, a black king can only move down-left', () => {
      });
    });

    /** Board layout
    * |##| 1|##| 2|##| 3|##| 4|
    * | 5|##| 6|##| 7|##| 8|##|
    * |##| 9|##|10|##|11|##|12|
    * |13|##|14|##|15|##|16|##|
    * |##|17|##|18|##|19|##|20|
    * |21|##|22|##|23|##|24|##|
    * |##|25|##|26|##|27|##|28|
    * |29|##|30|##|31|##|32|##|
    */
    describe('Jump moves with respect to piece colour', () => {
      describe('A white king can jump diagonally in any direction', () => {
        let wrapper;
        beforeAll(() => {
          const fen = 'W:W5,K18:B14,K15,22,K23';
          wrapper = mount(<App size={8} fen={fen} />);
        });
        test('No squares are initally highlighted or selected', () => {
          expect(wrapper.find('button.selected')).toHaveLength(0);
          expect(wrapper.find('button.highlighted')).toHaveLength(0);
        });
        test('A clicked square is marked as selected and legal moves are highlighted', () => {
          wrapper.find('#square-18').simulate('click');
          wrapper.update();

          expect(wrapper.find('#square-18').hasClass('selected')).toEqual(true);
          expect(wrapper.find('button.selected')).toHaveLength(1);

          expect(wrapper.find('#square-9').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-11').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-25').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('#square-27').hasClass('highlighted')).toEqual(true);
          expect(wrapper.find('button.highlighted')).toHaveLength(4);
        });
      });
      describe('A black king can jump diagonally in any direction', () => {
      });
      describe('A white man can only jump diagonally up the board', () => {
      });
      describe('A black man can only jump diagonally down the board', () => {
      });
    });
    describe('Simple moves when jump moves are available', () => {
      describe('A white piece cannot make a simple move if a jump move is available', () => {
      });
      describe('A black piece cannot make a simple move if a jump move is available', () => {
      });
      describe('A white piece cannot make a simple move if another white piece can jump instead', () => {
      });
      describe('A black piece cannot make a simple move if another white piece can jump instead', () => {
      });
    });
  });
});
