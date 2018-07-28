import React, { Component } from 'react';
import queryString from 'query-string';
import DraughtsBoard from './DraughtsBoard';
import Board from './board';
import './app.css';

/**
 * Top level component for this application.
 * @summary Wiring together of components, business logic and POJO state.
 * @todo Make player turn display more stylish. Display history and allow undo.
 * State could be moved to separate data store objects, with corresponding event subscription
 *{@link https://codeutopia.net/blog/2016/02/01/react-application-data-flow-where-and-how-to-store-your-data/}
 */
export default class App extends Component {
  /**
  * Constructor.
  * @param {object} props The React props.
  */
  constructor(props) {
    super(props);

    /** Stores the state of the board and enables user interactions. */
    this.board = new Board(8);

    /** Stores the state of this component. */
    this.state = {
      username: null,
      squares: this.board.squares,
      turn: this.board.turn
    };
  }

  /**
  * Starts a new game based on the position defined in the URL.
  */
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    this.setState({ squares: this.board.startGame(parsed.fen), turn: this.board.turn });
  }

  /**
  * Handles a click on a board square.
  * @param {Square} square The square that was clicked.
  */
  handleSquareClick(square) {
    this.board.squareClicked(square);
    this.setState({ squares: this.board.squares, turn: this.board.turn });
  }

  /**
  * Returns the React elements forming the page for which React will update the DOM accordingly.
  */
  render() {
    const { username = 'Loading.. please wait!', squares, turn } = this.state;
    const turnText = turn && turn.blackTurn ? 'Black turn' : 'White turn';
    return (
      <div>
        <div>
          <h1>
            { username }
          </h1>
          <div>
            { turnText }
          </div>
        </div>
        <div>
          <DraughtsBoard
            squares={squares}
            onClick={square => this.handleSquareClick(square)}
          />
        </div>
      </div>
    );
  }
}
