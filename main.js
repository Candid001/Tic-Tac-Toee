// Game state variables
let currentPlayer = 'X';
let playerXScore = 0;
let playerOScore = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const gridItems = document.querySelectorAll('.grid-item');
const turnMessage = document.getElementById('turnMessage');
const playerXScoreDisplay = document.getElementById('playerXScore');
const playerOScoreDisplay = document.getElementById('playerOScore');
const newGameButton = document.getElementById('newGameButton');
const resetScoresButton = document.getElementById('resetScoresButton');

// Initialize the game
function initGame() {
    gridItems.forEach((item, index) => {
        item.textContent = '';
        item.style.backgroundColor = '';
        item.style.color = '';
        item.style.fontSize = '';
        item.style.fontWeight = '';
    });
    
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    turnMessage.textContent = `Player ${currentPlayer}'s Turn`;
}

// Click and display of grid-Elements
gridItems.forEach((item, index) => {
    item.addEventListener('click', () => handleCellClick(index));
});

function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    gridItems[index].textContent = currentPlayer;
    gridItems[index].style.backgroundColor = currentPlayer === 'X' ? 'rgb(213, 229, 255)' : 'rgb(196, 255, 225)';
    gridItems[index].style.color = currentPlayer === 'X' ? 'blue' : 'green';
    gridItems[index].style.fontSize = '50px';
    gridItems[index].style.fontWeight = '700';

    checkGameResult();
    if (gameActive) {
        handlePlayerChange();
    }
}

// Change the players turn when each plays
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnMessage.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for game results and declare the winner
function checkGameResult() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            playerXScore++;
        } else {
            playerOScore++;
        }
        updateScoreDisplay();
        turnMessage.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        turnMessage.textContent = "Game Ended in a Draw!";
        gameActive = false;
    }
}

// Make the score board counts when a player wins
function updateScoreDisplay() {
    playerXScoreDisplay.textContent = playerXScore;
    playerOScoreDisplay.textContent = playerOScore;
}

// Clear the entire grid space when a new game button is pressed
newGameButton.addEventListener('click', initGame);

// Reset the score board when reset score button is pressed
resetScoresButton.addEventListener('click', () => {
    playerXScore = 0;
    playerOScore = 0;
    updateScoreDisplay();
    initGame();
});

// Initialize the game on page load
initGame();