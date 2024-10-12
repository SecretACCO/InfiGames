const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

const boardSize = 20; // 20x20 grid
const boxSize = 15; // Each box will be 15px
let snake = [];
let direction = { x: 1, y: 0 }; // Start moving right
let food = {};
let score = 0;
let gameInterval;
let intervalTime = 500; // Initial speed (in milliseconds)

function createFood() {
    // Create food at random position
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

function draw() {
    gameBoard.innerHTML = ''; // Clear the board
    // Draw snake segments
    snake.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.width = `${boxSize}px`;
        snakeElement.style.height = `${boxSize}px`;
        snakeElement.style.backgroundColor = index === 0 ? '#ff4b2b' : '#ff416c'; // Head and body colors
        snakeElement.style.position = 'absolute';
        snakeElement.style.left = `${segment.x * boxSize}px`;
        snakeElement.style.top = `${segment.y * boxSize}px`;
        gameBoard.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.style.width = `${boxSize}px`;
    foodElement.style.height = `${boxSize}px`;
    foodElement.style.backgroundColor = '#00ff00'; // Food color
    foodElement.style.position = 'absolute';
    foodElement.style.left = `${food.x * boxSize}px`;
    foodElement.style.top = `${food.y * boxSize}px`;
    gameBoard.appendChild(foodElement);
}

function update() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with walls
    if (
        newHead.x < 0 || 
        newHead.x >= boardSize || 
        newHead.y < 0 || 
        newHead.y >= boardSize || 
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

    // Check if snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        createFood();

        // Increase speed every 5 points
        if (score % 5 === 0) {
            intervalTime = Math.max(100, intervalTime - 100); // Decrease interval time but not below 100ms
            clearInterval(gameInterval);
            gameInterval = setInterval(update, intervalTime); // Restart interval with new time
        }
    } else {
        snake.pop(); // Remove the last segment if not eating food
    }

    snake.unshift(newHead); // Add new head
    draw();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 }; // Prevent moving down
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 }; // Prevent moving up
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 }; // Prevent moving right
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 }; // Prevent moving left
            break;
    }
}

function startGame() {
    snake = [{ x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) }]; // Start in the middle
    direction = { x: 1, y: 0 }; // Start moving right
    score = 0;
    scoreDisplay.textContent = score;
    intervalTime = 500; // Reset speed
    createFood();
    draw();
    clearInterval(gameInterval);
    gameInterval = setInterval(update, intervalTime); // Initial interval
}

restartButton.addEventListener('click', startGame);
window.addEventListener('keydown', changeDirection);

// Start the game on load
startGame();
