const statusDisplay = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
let gameActive = true;

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameBoard.children[clickedCellIndex].textContent = currentPlayer;
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  // Win conditions: 3 rows, 3 columns, 2 diagonals
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i];
    const a = gameBoard.children[winCondition[0]].textContent;
    const b = gameBoard.children[winCondition[1]].textContent;
    const c = gameBoard.children[winCondition[2]].textContent;
    if ([a, b, c].includes("")) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }
  // Check for tie
  const allPlayed = Array.from(gameBoard.children).every(cell => cell.textContent !== '');
  if (allPlayed) {
    statusDisplay.textContent = "Game is a Tie!";
    gameActive = false;
  } else {
    handlePlayerChange();
  }
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = Array.from(gameBoard.children).indexOf(clickedCell);

  if (clickedCell.textContent !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  checkWin();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = 'X';
  statusDisplay.textContent = "Player X's Turn";
  Array.from(gameBoard.children).forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
