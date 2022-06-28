
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

})();


/*---Game Control Module---*/


const gameController = (() => {


})();