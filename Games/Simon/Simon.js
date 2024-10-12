const startButton = document.getElementById('startButton');
const statusDisplay = document.getElementById('status');
const buttons = document.querySelectorAll('.color-button');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const difficultySelect = document.getElementById('difficulty');

let gamePattern = [];
let userPattern = [];
let level = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 1000; // Default speed for easy

highScoreDisplay.textContent = `High Score: ${highScore}`;

startButton.addEventListener('click', startGame);

function startGame() {
    gamePattern = [];
    userPattern = [];
    level = 0;
    gameSpeed = parseInt(difficultySelect.value);
    nextSequence();
}

function nextSequence() {
    userPattern = [];
    level++;
    statusDisplay.textContent = `Level ${level}`;
    
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = buttons[randomNumber].id;
    gamePattern.push(randomColor);
    
    animateButton(randomColor);
    playSound(randomColor);
}

function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const userChosenColor = button.id;
        userPattern.push(userChosenColor);
        animateButton(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, gameSpeed);
        }
    } else {
        statusDisplay.textContent = 'Game Over! Press Start to try again.';
        updateHighScore();
        startButton.style.display = 'block'; // Show the start button again
    }
}

function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`); // Ensure sound files are in a folder named 'sounds'
    audio.play();
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}
