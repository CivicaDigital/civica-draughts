## Exercise 3 – Fixing a fault

### Aims
This exercise has the following main aims:
* To get you writing code by fixing a fault in the application's JavaScript:
  *  In draughts, men reaching the king's row (the farthest row forward) become kings. In our game this does not happen which will prevent proper play.
* To get you writing tests, and writing them before making code changes where possible.
* To make you think about the best way to fix a fault.

### The code
| File                            | Description          |
|---------------------------------|----------------------|
| ./test/shared/*.js	            | You'll need to find out which file(s) to change. |
| ./test/shared/*.test.js	        | The tests affected will depend on the changes made. |

### What to do
1. Open your local repository folder in Visual Studio Code.
1. Identify which class or module the king's row check should be added to.
1. Identify which test file is responsible for testing the modified code.
1. Add or update tests as appropriate to fully test the change you intend on making.
1. Run the tests (`yarn jest`) and check they fail - and fail for the correct reason!
1. Update the code to fix the fault.
1. Run the tests again and make sure they all pass.
1. Run the game (`yarn dev`).
1. Verify manually that your fault fix was successful.


