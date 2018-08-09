## Exercise 4 – Making some simple changes

### Aims
This exercise has the following main aims:
* To introduce some simple user interface changes:
  * Allow each player to enter their names and will show whose turn it is more clearly using this information. 
  * Add a check for victory conditions and identify the winner accordingly on the page.
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
1. You now need to think carefully about the folowing design decisions for both changes:
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


