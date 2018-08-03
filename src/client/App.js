import React, { Component } from 'react';
import DraughtsBoard from './DraughtsBoard';
import BoardController from './board-controller';
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
    this.boardController = new BoardController(props.size);

    /** Stores the state of this component. */
    this.state = {
      squares: this.boardController.startGame(props.fen),
      turn: this.boardController.turn
    };
  }

  /**
  * This is the pace to do any AJAX calls needed to initalise the component fully.
  */
  componentDidMount() {

  }

  /**
  * Handles a click on a board square.
  * @param {Square} square The square that was clicked.
  */
  handleSquareClick(square) {
    this.boardController.squareClicked(square);
    this.setState({ squares: this.boardController.board.squares, turn: this.boardController.turn });
  }

  /**
  * Returns the React elements forming the page for which React will update the DOM accordingly.
  */
  render() {
    const { squares, turn } = this.state;
    const turnText = turn && turn.blackTurn ? 'Black turn' : 'White turn';
    return (
      <div>
        <div>
          <h1>
            Draughts
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
