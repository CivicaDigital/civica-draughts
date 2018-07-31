import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from '../src/client/App';

it('renders correctly when the board is empty', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders legal moves correctly when a square is clicked', () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('button.selected')).toHaveLength(0);
  expect(wrapper.find('button.highlighted')).toHaveLength(0);

  wrapper.find('#square-27').simulate('click');
  wrapper.update();

  expect(wrapper.find('#square-27').hasClass('selected')).toEqual(true);
  expect(wrapper.find('button.selected')).toHaveLength(1);

  expect(wrapper.find('#square-23').hasClass('highlighted')).toEqual(true);
  expect(wrapper.find('#square-24').hasClass('highlighted')).toEqual(true);
  expect(wrapper.find('button.highlighted')).toHaveLength(2);
});
