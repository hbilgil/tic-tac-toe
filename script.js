
//GLOBAL VARIABLE DECLARATIONS


const X_CLASS = 'x'
const O_CLASS = 'o'
let  circleTurn = false; // Boolean variable & "X" is the game opener mark, so "O" class turn is declared as false


//MODULES


/*---Display Control Module---*/


const displayController = (() => {

  //Local UI Variable Declarations

  const board = document.getElementById('gameBoard');
  const finalMessageCreator = document.getElementById('finalMessage');
  const overlayWindowCreator = document.getElementById('overlayWindow');
  const winningMessageTextElement = document.getElementById('endgameMsg');
  const turnMessage = document.getElementById('information');

  //Local Factory Functions

  const setBoardHovers = () => { //allowing to manipulate DOM to add & remove classes for 'X' and 'O' signs

    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
  
    if (circleTurn) {
      board.classList.add(O_CLASS);
    } else {
      board.classList.add(X_CLASS);
    }
  
  }

  const changeMark = () => { //allowing to change playing sign and informing the User about which sign is able to make move

    circleTurn = ! circleTurn
    turnMessage.textContent = `${circleTurn ? "Player O" : "Player X"}` + "' s turn";

  }

  const placeMark = (field, currentClass) => { //allowing to manipulate DOM to add sign into the gameBoard

    field.classList.add(currentClass)

  }

  const endGameMessage = (draw) => { //allowing to display a final message window informing the User about the winner, looser or a draw by DOM Manipulations

    if(draw) {
       winningMessageTextElement.textContent = "It's a Draw!"
     } else {
       winningMessageTextElement.textContent = `${circleTurn ? "Player O" : "Player X"} Wins!`
     }

     finalMessageCreator.classList.add('active');
     overlayWindowCreator.classList.add('active');

   }

   return { setBoardHovers, changeMark, placeMark, endGameMessage }; //Functions that will be used out of local scope as a method

})();


/*---Game Control Module---*/


const gameController = (() => {


})();