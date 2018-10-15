## Exercise 2 – Adding to existing tests

### Aims
This exercise has the following main aims:
* To get you familiar with the development environment you will be using to do the exercises.
* To demonstrate the concept of unit testing.

### The code
| File                            | Description          |
|---------------------------------|----------------------|
| ./src/shared/moves.js	          | Functions for the verifying and making of moves. |
| ./src/shared/squares.js	        | Functions for setting up a representation of the board, including valid potential moves from each square. |
| ./test/shared/moves.test.js	    | Unit tests for ./src/shared/moves.js. |
| ./test/shared/squares.test.js	  | Unit tests for ./src/shared/squares.js. |

### What to do
1. Clone the repository from https://github.com/CivicaDigital/civica-draughts.git.
1. Create a new branch called exercise-1 and check it out.
1. Open your local repository folder in Visual Studio Code.
1. Locate moves.test.js. This file is fully commented and written to the JavaScript standards enforced by ESLint, which have been configured for the purposes of this exercise.
1. Referring to the design documentation, familiarise yourself with the tests and the functionality they are trying to test.
1. Locate squares.js and examine the `isEven` function.
1. Create a new file squares.test.js and write a test for the `isEven` function.
1. Examine the `createSquares` function and write some tests for it.
1. Is the function complete as it is? What more could we do?


