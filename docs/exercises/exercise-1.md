 ## Exercise 1 – Looking at existing code and coding standards

### Aims
This exercise has the following main aims:
* To get you familiar with the development environment you will be using to do the exercises.
* To give you the opportunity to examine JavaScript code written to the standards you are to uphold.
* To examine how violations of the coding standards can be detected and addressed.

### The code
| File                            | Description          |
|---------------------------------|----------------------|
| ./eslintrc.json                 | ESLint static analysis configuration file. |
| ./src/shared/moves.js	          | Functions for the verifying and making of moves. |
| ./src/shared/squares.js	        | Functions for setting up a representation of the board, including valid potential moves from each square. |
| ./test/shared/moves.test.js	    | Unit tests for ./src/shared/moves.js. |
| ./test/shared/squares.test.js	  | Unit tests for ./src/shared/squares.js. |

### What to do
1. Clone the repository from https://github.com/CivicaDigital/civica-draughts.git.
1. Create a new branch called exercise-1 and check it out.
1. Locate moves.js and squares.js. These files are fully commented and written to the JavaScript standards enforced by ESLint, which have been configured for the purposes of this exercise.
1. Referring to the design documentation, familiarise yourself with the content and functionality of these modules. A good understanding of both syntax and function is important so please highlight anything that requires further clarification – it is expected that some assistance will be required at this stage. Key concepts covered include:
 * The basics: variables, constants, functions, parameters and loops.
 * Custom data types including classes and nested arrays of objects.
 * Importing classes from another file.
 * Incrementing and decrementing operands.
 * Arrays: pushing, assigning to an index, looping through, mapping and reducing.
1. Compare the code to the tests that cover it – can you find any untested code paths?
1. Open eslintrc.json, remove the following line <code>"no-bitwise": "off"</code>, and save the file.
1. Revisiting moves.js should now result in a problem being reported in the Problems panel, warning of: <code>[eslint] Unexpected use of ‘^’. (no-bitwise)</code>
1. Correct the problem by amending the code appropriately. Do the same in squares.js.
1. Run the unit tests again – did they all pass?
