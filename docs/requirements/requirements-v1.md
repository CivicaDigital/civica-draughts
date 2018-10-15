## Introduction
This document specifies the requirements for a simple web application allowing users to play English draughts, the rules of which are defined [here](rules.md).  

## System Overview and Terminology
The initial version of the application will be largely client-side JavaScript. It is anticipated that future version will include interaction with a Node.js server process.

## Functional Requirements
* `M0005` When the default page loads, a new game shall begin.

### New games
* `M0110` The initial board position of a new game shall be configurable with a valid FEN tag supplied via the * `fen` parameter of the URL query string.
* `M0115` The format of the FEN tag is defined [here](https://en.wikipedia.org/wiki/Portable_Draughts_Notation).
* `M0120`  When a valid FEN is not supplied, a new game will default to the standard 8x8 draughts initial board position.

### Computer player
* `M0200` The computer player shall only make valid moves as defined by the game [rules](rules.md).
* `M0215` The computer shall make its move within 10 seconds.
* `M0220` A computer player shall clearly be identifiable as such from the user interface.

### Human Player
* `M0300` The game shall only allow a human player to make valid moves as defined by the game [rules](rules.md).
* `M0315` The player shall be allowed unlimited time in which to make their move.

#### Piece selection and move highlighting
* `M0320` When a player clicks on a square in which one of his pieces resides, the piece will be selected and the square clearly marked to indicate that it is selected.
* `M0325` When a piece is selected, the legal moves available to the piece will be highlighted.
* `M0330` When legal moves are being highlighted, only the first move in a chain shall be highlighted.
* `M0340` When a piece is selected, clicking on one of the highlighted legal move squares will result in the move being made.
* `M0345` All selection and highlighting indicators shall be cleared prior to a new selection being made or a non-playable square being clicked.  

### User interface
* `M0400` The game shall clearly display whose turn it is.  

### Game end
* `M10001` The game shall detect when a game has ended, as defined in the game [rules](rules.md).