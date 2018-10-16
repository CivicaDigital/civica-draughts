import React, { Component } from 'react';
import { DraughtsBoard } from './DraughtsBoard';
import { BoardController } from './board-controller';
import './app.css';
import { NameForm } from './InputNameComponent';

/**
 * Top level component for this application.
 * @demonstrates Wiring together of components, business logic and POJO state.
 * @potential Make player turn display more stylish. Display history and allow undo.
 * State could be moved to separate data store objects, with corresponding event subscription
 *{@link https://codeutopia.net/blog/2016/02/01/react-application-data-flow-where-and-how-to-store-your-data/}
 */
export class App extends Component {
  /**
  * @param {object} props The React properties.
  */
  constructor(props) {
    super(props);

    /** Stores the state of the board and enables user interactions. */
    this.boardController = new BoardController(props.size);

    /** Stores the state of this component. */
    this.state = {
      squares: this.boardController.startGame(props.fen),
      turn: this.boardController.turn,
      nameStateBlack: '',
      nameStateWhite: ''
    };
  }

  /**
  * This is the pace to do any AJAX calls needed to initialise the component fully.
  * @method
  */
  componentDidMount() {

  }

  /**
  * Handles a click on a board square.
  * @method
  * @param {Square} square The square that was clicked.
  */
  handleSquareClick(square) {
    this.boardController.squareClicked(square);
    this.setState({ squares: this.boardController.board.squares, turn: this.boardController.turn });
  }

  handleNameChangeWhite(nameStateWhite) {
    this.setState({ nameStateWhite: nameStateWhite.currentTarget.value });
  }

  handleNameChangeBlack(nameStateBlack) {
    this.setState({ nameStateBlack: nameStateBlack.currentTarget.value });
  }

  /**
  * Returns the React elements forming the page for which React will update the DOM accordingly.
  * @method
  */
  render() {
    const {
      squares, turn, nameStateWhite, nameStateBlack
    } = this.state;

    const turnText = turn && turn.blackTurn ? nameStateBlack : nameStateWhite;
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
        <div>
          <NameForm
            myID={nameStateWhite}
            onChange={whitename => this.handleNameChangeWhite(whitename)}
            label="Player one: "
          />
          <NameForm
            myID={nameStateBlack}
            onChange={blackname => this.handleNameChangeBlack(blackname)}
            label="Player two: "
          />
        </div>
      </div>
    );
  }
}
