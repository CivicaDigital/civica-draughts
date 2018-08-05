/**
 * Renders a draughts board square from its corresponding data structure.
 * @demonstrates Unicode symbols, CSS class adjustment.
 * @potential Needs testing. Consider naming conventiom of components/state objects.
 * @module DraughtsBoardSquare
 */

import React from 'react';
// This class is imported to allow navigation via documentation type definitions so:
// eslint-disable-next-line
import { Square } from '../shared/data-types';  // Alias to avoid conflict
import './app.css';

/**
 * Gets the UTF draughts symbol for the piece.
 * @param {Piece} piece The piece for which to get the symbol
 * @returns {string} UTF symbol representing the piece.
 */
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
 * @param {Square} square The data for this board square.
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
 * @param {object} props The React properties.
 * @returns {DraughtsBoardSquare} Returns the React elements forming the draughts board square.
 */
export const DraughtsBoardSquare = props => (
  <button
    className={getClass(props.square)}
    key={props.square.identifier.toString()}
    onClick={props.onClick}
    type="button"
    id={`square-${props.square.identifier.toString()}`}
  >
    {getDisplay(props.square.piece)}
  </button>
);
