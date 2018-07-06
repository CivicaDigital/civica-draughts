import React, { Component } from "react";
import Square from "./Square";
import "./app.css";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  renderBoard(squares) {
    return squares.map(row => {
      return <div>{this.renderRow(row)}</div>;
    });
  }

  renderRow(row) {
    return row.map(square => {
      return (
        <Square square={square} onClick={() => this.props.onClick(square)} />
      );
    });
  }

  renderSquare(square) {
    return (
      <Square square={square} onClick={() => this.props.onClick(square)} />
    );
  }

  render() {
    return <div>{this.renderBoard(this.props.squares)}</div>;
  }
}
