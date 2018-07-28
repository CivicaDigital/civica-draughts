/**
 * Renders a draughts board square from its corresponding data structure.
 * @summary Unicode symbols, CSS class adjustment.
 * @todo Needs testing. Conisder naming conventiom of components/state objects.
 */

import React from 'react';
// This class is imported to allow navigation via documentation type definitions so:
// eslint-disable-next-line
import { Square as SquareState } from '../shared/data-types';  // Alias to avoid conflict
import './app.css';

function getDisplay(piece) {
  if (!piece) {
    return '\u200C ';
  } if (piece.black) {
    return piece.king ? '\u26C3' : '\u26C2';
  }
  return piece.king ? '\u26C1' : '\u26C0';
}

/**
 * Gets the CSS class for the square depending on its current state.
 * @param {SquareState} square The data for this board square.
 * @returns {string} The CSS class for the square.
 */
function getClass(square) {
  const className = 'square';
  if (square.selected) {
    return `${className} selected`;
  } if (square.highlighted) {
    return `${className} highlighted`;
  } if (square.playable) {
    return `${className} playable`;
  }
  return `${className} unplayable`;
}

/**
 * Renders a draughts board square from its corresponding data structure.
 */
const Square = props => (
  <button
    className={getClass(props.square)}
    key={props.square.identifier.toString()}
    onClick={props.onClick}
    type="button"
  >
    {getDisplay(props.square.piece)}
  </button>
);

export default Square;
