## Data Types

### Domain knowledge
Before considering code and data, it is useful to think about the terms we would use to describe a game of draughts in English, some of which are listed below with their defining characteristics:

| Term            | Description                                                  | 
|-----------------|--------------------------------------------------------------|
| Piece           | Each piece is either black or white and is a man or a king.  |
| Square          | A discrete location at which a piece can reside - in draughts only the black squares are used. |
| Board	          | The collection of squares that make up the game environment, the relative positions of which define the potential moves of the pieces. |
| Position        | Specifies the location of all pieces on the board at a point in time. |
| Move            | A change of position where a piece moves from an origin to a destination square, potentially capturing an opposing piece in the process. |
| Turn            | One or more consecutive moves from a player, beginning at a start position. |
| Game            | The sequence of turns from the commencement of play until a win or draw is declared. |

### Class equivalents
All of the above terms correspond to data, or state, and so it makes sense that they have an equivalent class to represent them in our application. The information each should store also becomes apparent:

#### Piece
A piece remains very simple, with only two properties which determine both its appearance and significance in the game:

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| black           | `boolean`       | A value indicating whether the piece is black. |
| king            | `boolean`       | A value indicating whether the piece is a king. |

#### Square
A square needs to identify its position and whether it is playable i.e. one of the black squares. It's also useful to define the potential moves a piece residing the square could make i.e. zero, one or two squares in each diagonal direction, depending on the square's position on the board. We also need to consider UI interaction and display - squares will need to be selected and highlighted:

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| playable        | `boolean`       | A value indicating whether the piece is black. |
| identifier      | `number`        | Provides a unique identifier of the square's position on the board. |
| potentialMoves  | `Array<PotentialMoves>` | The potential moves possible from the square. |
| highlighted     | `boolean`       | A value indicating whether the square is currently highlighted. |
| selected        | `boolean`       | A value indicating whether the square is currently selected. |

#### Board
The board must have a defined size, from which the squares can be generated for later display. We will also store those squares which are playable in a separate array, for ease of reference when constructing game logic.

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| size            | `number`        | The width/length of the board in squares. |
| squares         | `Array<Array<Square>>` | The squares that make up the board.  |
| playableSquares | `Array<Square>` | The playable squares of the board, indexed based on their identifier. |

#### Move
A move defines a start square and an end square, as expected. The square that was jumped (if applicable) also needs recording, as does the resulting end position of all pieces - this could be derived from the turn start position (see below) but it will be convenient to explicity store it here. Note also that the position is merely an array of Piece objects and so does nto need its own class defining.

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| origin          | `number`        | The unique identifier of the square from which the moves starts. |
| destination     | `number`        | The unique identifier of the square in which the moves ends.  |
| jumped          | `number`        | The unique identifier of the square the move jumps over, if any.  |
| endPosition     | `Array<Piece>`  | The pieces at the end of this move, indexed in accordance with the square they are on. |

#### Turn
A turn is a collection of one or more moves and a start position, with an indication of which player it was:

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| blackTurn       | `boolean`       | A value indicating whether it was black's turn. |
| startPosition   | `Array<Piece>`  | The pieces at the start of the turn, indexed in accordance with the square they are on. |
| moves           | `Array<Move>`   | The moves taking place within the turn. |

#### Game
A game is just a collection of turns in sequence:

| Name            | Type            | Description                       | 
|-----------------|-----------------|-----------------------------------|
| turns           | `Array<Turn>`   | The sequence of turns of the game so far. |

In JavaScript, the data describe above could be stored as POJO (Plain Old JavaScript Object), for example:

```JavaScript
{
  "playable": boolean,
  "identifier": boolean
}
```

but we are going to take advantage of the new ES6 class syntax:

```JavaScript
class Piece {
  /**
  * @param {boolean} black A value indicating whether the piece is black.
  * @param {boolean} king A value indicating whether the piece is a king.
  */
  constructor(black, king) {
    /** A value indicating whether the piece is black. */
    this.black = black;

    /** A value indicating whether the piece is a king. */
    this.king = king;
  }
}
```

