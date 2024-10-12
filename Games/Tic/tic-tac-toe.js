const cells = document.querySelectorAll('[data-cell]');
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');
const rematchButton = document.getElementById('rematch-btn');

let isCircleTurn = false;
let xScore = 0;
let oScore = 0;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initial setup for click listeners
startGame();

// Rematch button event listener
rematchButton.addEventListener('click', startGame);

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.innerHTML = '';
        cell.removeEventListener('click', handleClick); // Ensure no old listeners
        cell.addEventListener('click', handleClick, { once: true }); // Add new listeners
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
        updateScore(currentClass);
        setTimeout(() => alert(`${currentClass === X_CLASS ? 'X' : 'O'} Wins!`), 10);
        rematch();
    } else if (isDraw()) {
        setTimeout(() => alert('Draw!'), 10);
        rematch();
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.innerHTML = currentClass === X_CLASS ? 'X' : 'O';
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function updateScore(winner) {
    if (winner === X_CLASS) {
        xScore++;
        xScoreElement.textContent = xScore;
    } else {
        oScore++;
        oScoreElement.textContent = oScore;
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        const win = combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
        if (win) {
            combination.forEach(index => {
                cells[index].classList.add('winning-cell'); // Add pulse effect to winning cells
            });
        }
        return win;
    });
}


function rematch() {
    startGame(); // Reset the board, but keep the score
}
