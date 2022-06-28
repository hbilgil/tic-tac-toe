
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

  //Local Variable Declarations

  const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];

  let myInterval; //empty variable declaration which will be changed accordingly inside the functions

  //Local UI Variable Declarations

  const playerVsPlayerBtn = document.querySelector('.player-vs-player');
  const playerVsBotBtn = document.querySelector('.player-vs-robot');
  const fieldElements = document.querySelectorAll('[data-cell]');
  const restartBtn = document.getElementById('restartBtn');
  const overlayWindowRemover = document.getElementById('overlayWindow');
  const finalMessageRemover = document.getElementById('finalMessage');
  const turnMessageInitializer = document.getElementById('information');

  //Local Factory Functions

  const checkWinner = (currentClass) => {  //allowing to check whether the game has a winner

    return WINNING_COMBINATIONS.some(combination => {
  
      return combination.every(index => {
          return fieldElements[index].classList.contains(currentClass)
      })
    })
  
  }

  const checkDraw = () => { //allowing to check whether the game ended with a draw

    return [...fieldElements].every(cell => { //destructuring assignment is used in order to derive values in fieldsElement array
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })

  }

  const pushClick = (e) => { //allowing the players or bot to put signs inside the board when mouse clicked

    const field = e.target; //the exact field element when clicked
    const currentClass = circleTurn ? O_CLASS : X_CLASS; // ternary operator to decide whose turn it is
    
    displayController.placeMark(field, currentClass); //placeMark method is called which is nested in the displayController to place X or O sign
  
    if(checkWinner(currentClass)){
      displayController.endGameMessage(false); //endGameMessage method is called which is nested in the displayController with false property if NOT a draw
    } else if(checkDraw()) {
      displayController.endGameMessage(true); //endGameMessage method is called which is nested in the displayController with true property if a draw
    } else {
      displayController.changeMark() //changeMark method is called which is nested in the displayController, if neither a win Nor a draw
      displayController.setBoardHovers() //setBoardHovers method is called which is nested in the displayController, if neither a win Nor a draw
    }

  }

  const startGame = () => { //allowing to clear ALL data inside the board and refresh the game

    circleTurn = false; // will return the starting mark as "X" every time a new game restarts
    fieldElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', pushClick)
    cell.addEventListener('click', pushClick, { once: true })}) //the click will do the event once and will not let the user do it again!//
    
    displayController.setBoardHovers(); //setBoardHovers method is called which is nested in the displayController
    finalMessageRemover.classList.remove('active')
    overlayWindowRemover.classList.remove('active')
    return turnMessageInitializer.textContent = `${circleTurn ? "Player O" : "Player X"}` + "' s turn"; //X is always the game opener

  }

  const invokeRandomChoice = () => { //allowing the bot make a random choice inside the board

    if (circleTurn  === false) { //prevent recursive invocation as it will be processed when it is bot's turn (as 'O' Class)
      return
    }
      else {
      let randomField = fieldElements[Math.floor(Math.random() * fieldElements.length)];
      let result = randomField.click(); //randomly chosen field will be clicked by click() method
      return result;
    }

  }

})();