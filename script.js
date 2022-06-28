
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

})();


/*---Game Control Module---*/


const gameController = (() => {


})();