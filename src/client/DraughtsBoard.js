import React, { Component } from 'react';
import DraughtsBoardSquare from './DraughtsBoardSquare';
import './app.css';

/**
* Renders the draughts board from its data structure comprising of squares.
* @summary Nested components and functions, Array.prototype.map(), suppressing eslint.
* @todo Being stateless, this class could become a pure JavaScript function/module.
*/
export default class DraughtsBoard extends Component {
  renderBoard(squares) {
    return squares.map((row, index) => (
      // The row index will not change from one render to the next and have no other unique ID so:
      // eslint-disable-next-line
      <div key={index}>
        {this.renderRow(row)}
      </div>));
  }

  /**
  * Returns the React elements that form the row of squares.
  * @param {Array<DraughtsBoardSquare>} row The row data.
  */
  renderRow(row) {
    return row.map(square => (
      <DraughtsBoardSquare
        square={square}
        key={square.identifier.toString()}
        onClick={() => this.props.onClick(square)}
      />
    ));
  }

  /**
  * Returns the React elements that form the board.
  */
  render() {
    return (
      <div key="board">
        {this.renderBoard(this.props.squares)}
      </div>
    );
  }
}
