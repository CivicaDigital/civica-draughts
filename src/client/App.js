import React, { Component } from "react";
import Board from "./Board";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    const squares = this.getSquares(8);
    this.state = {
      username: null,
      squares: squares,
      squaresById: this.getSquaresById(squares)
    };
  }

  componentDidMount() {
    fetch("/api/getUsername")
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  handleClick(square) {
    alert(square.identifier);
  }

  isEven(n) {
    return n % 2 == 0;
  }

  getSquares(width) {
    let identifier = 0;
    let squares = new Array(width);
    for (let i = 1; i <= width; i++) {
      squares[i - 1] = new Array(width);
      let evenRow = this.isEven(i);
      for (let j = 1; j <= width; j++) {
        let square = {
          playable: false,
          highlighted: false,
          identifier: null
        };
        squares[i - 1][j - 1] = square;
        if (evenRow ^ this.isEven(j)) {
          identifier++;
          square.playable = true;
          square.identifier = identifier;
        }
      }
    }
    return squares;
  }

  getSquaresById(squares) {
    return squares.reduce((o, item) => {
      if (item.identifier) {
        o[identifier] = item;
      }
      return o;
    });
  }

  render() {
    const piece1 = { black: true, king: true };
    const piece2 = { black: false, king: true };

    this.state.squaresById[1].piece = piece1;
    this.state.squaresById[2].piece = piece2;
    const current = { squares: this.state.squares };
    return (
      <div>
        <div>
          {this.state.username ? (
            <h1>Hello {this.state.username}</h1>
          ) : (
            <h1>Loading.. please wait!</h1>
          )}
        </div>
        <div>
          <Board squares={current.squares} onClick={(square) => this.handleClick(square)} />
        </div>
      </div>
    );
  }
}
