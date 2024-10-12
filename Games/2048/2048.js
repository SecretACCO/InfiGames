const boardSize = 4;
let board;
let score = 0;

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function init() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    addRandomTile();
    addRandomTile();
    draw();
}

function addRandomTile() {
    const emptyCells = [];
    board.forEach((row, x) => {
        row.forEach((value, y) => {
            if (value === 0) emptyCells.push({ x, y });
        });
    });

    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
}

function draw() {
    gameBoard.innerHTML = '';
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = value !== 0 ? value : '';
            gameBoard.appendChild(tile);
        });
    });
}

function slideTiles(direction) {
    let moved = false;

    if (direction === 'left') {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 1; j < boardSize; j++) {
                if (board[i][j] !== 0) {
                    for (let k = j; k > 0; k--) {
                        if (board[i][k - 1] === 0) {
                            board[i][k - 1] = board[i][k];
                            board[i][k] = 0;
                            moved = true;
                        } else if (board[i][k - 1] === board[i][k]) {
                            board[i][k - 1] *= 2;
                            score += board[i][k - 1];
                            board[i][k] = 0;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < boardSize; i++) {
            for (let j = boardSize - 2; j >= 0; j--) {
                if (board[i][j] !== 0) {
                    for (let k = j; k < boardSize - 1; k++) {
                        if (board[i][k + 1] === 0) {
                            board[i][k + 1] = board[i][k];
                            board[i][k] = 0;
                            moved = true;
                        } else if (board[i][k + 1] === board[i][k]) {
                            board[i][k + 1] *= 2;
                            score += board[i][k + 1];
                            board[i][k] = 0;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'up') {
        for (let j = 0; j < boardSize; j++) {
            for (let i = 1; i < boardSize; i++) {
                if (board[i][j] !== 0) {
                    for (let k = i; k > 0; k--) {
                        if (board[k - 1][j] === 0) {
                            board[k - 1][j] = board[k][j];
                            board[k][j] = 0;
                            moved = true;
                        } else if (board[k - 1][j] === board[k][j]) {
                            board[k - 1][j] *= 2;
                            score += board[k - 1][j];
                            board[k][j] = 0;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < boardSize; j++) {
            for (let i = boardSize - 2; i >= 0; i--) {
                if (board[i][j] !== 0) {
                    for (let k = i; k < boardSize - 1; k++) {
                        if (board[k + 1][j] === 0) {
                            board[k + 1][j] = board[k][j];
                            board[k][j] = 0;
                            moved = true;
                        } else if (board[k + 1][j] === board[k][j]) {
                            board[k + 1][j] *= 2;
                            score += board[k + 1][j];
                            board[k][j] = 0;
                            moved = true;
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }

    if (moved) {
        addRandomTile();
        draw();
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            slideTiles('left');
            break;
        case 'ArrowRight':
            slideTiles('right');
            break;
        case 'ArrowUp':
            slideTiles('up');
            break;
        case 'ArrowDown':
            slideTiles('down');
            break;
    }
});

restartButton.addEventListener('click', init);

// Start the game on load
init();
