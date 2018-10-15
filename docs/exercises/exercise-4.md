## Exercise 4 – Making some simple changes

### Aims
This exercise has the following main aims:
* To introduce some simple user interface and underlying code changes:
  * Enable each player to enter their names and show whose turn it is more clearly using this information. 
  * Add a check for victory conditions and identify the winner accordingly on the page.
  * Enable undo functionality.
* To introduce thinking about page design and element positioning.
* To show how user interface change can be tested.

### The code
| File                    | Description          |
|-------------------------|----------------------|
| ./test/*.js	            | You'll need to find out which file(s) to change. |
| ./test/*.test.js	      | The tests affected will depend on the changes made. |

### What to do
1. Open your local repository folder in Visual Studio Code.
1. Run the game (`yarn dev`).
1. Examine the requirements and add and amend requirements for these changes.
1. You now need to think carefully about the folowing design decisions for the changes:
 * How to display the input elements used for entering the player names.
 * Where in the hierarchy of HTML elements the new elements will sit.
 * How these elements will be formatted and positioned with CSS.
 * Where will any associated data be stored.
 * What JavaScript functions will need updating to support the new functionality. 
1. It is also worth considering which aspects of these new elements you will test and how you will test them.
1. Write as much of the tests beforehand as you can.
1. Make the desired code changes.
1. Run the tests again and make sure they all pass.
1. Run the game (`yarn dev`).
1. Verify manually that your changes look and function as expected.
1. Submit a pull request.
1. Respond to review comments.


