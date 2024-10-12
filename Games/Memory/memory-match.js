const grid = document.getElementById('grid');
const moveCountElement = document.getElementById('move-count');
const restartButton = document.getElementById('restart-button');
const moveInput = document.getElementById('move-input');
const setMovesButton = document.getElementById('set-moves-button');
const winModal = document.getElementById('win-modal');
const closeWinModal = document.querySelector('.close-win-modal');
let cards = [];
let flippedCards = [];
let moveCount = 0;
let moveLimit = 0; // Set to 0 initially
let gameOver = false; // Track if the game is over

// Set moves on button click
setMovesButton.addEventListener('click', () => {
    const inputMoves = parseInt(moveInput.value);
    if (inputMoves > 0) {
        moveLimit = inputMoves;
        initGame(); // Start the game with the specified moves
    } else {
        alert("Please enter a valid number of moves.");
    }
});

// Initialize game
function initGame() {
    grid.innerHTML = ''; // Clear previous cards
    moveCount = 0;
    gameOver = false;
    moveCountElement.textContent = moveCount;
    moveInput.value = ''; // Clear input
    cards = createCardArray();
    cards = shuffle(cards);
    cards.forEach(card => grid.appendChild(card));
}

// Create card array
function createCardArray() {
    const cardValues = ['🍎', '🍌', '🍇', '🍊', '🍍', '🍓', '🍉', '🍒'];
    const cardArray = [...cardValues, ...cardValues]; // Duplicate for pairs
    return cardArray.map(value => createCardElement(value));
}

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card element
function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    return card;
}

// Flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !gameOver) {
        this.classList.add('flipped');
        this.textContent = this.dataset.value; // Show card value
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check match
function checkMatch() {
    moveCount++;
    moveCountElement.textContent = moveCount;

    if (moveCount >= moveLimit) {
        gameOver = true; // End the game
        showGameOverModal(); // Show modal
        return; // Prevent further actions
    }

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Match found
        flippedCards = [];
        checkWinCondition(); // Check if all pairs are found
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Check win condition
function checkWinCondition() {
    const totalCards = document.querySelectorAll('.card').length;
    const flippedCards = document.querySelectorAll('.flipped').length;

    if (totalCards === flippedCards) {
        showWinModal(); // Show win modal if all pairs are found
    }
}

// Show game over modal
function showGameOverModal() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = "block";
}

// Show win modal
function showWinModal() {
    winModal.style.display = "block";
}
const closeGameOverModal = document.querySelector('.close-game-over-modal');

// Show game over modal
function showGameOverModal() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = "block";
}

// Close the game over modal when the user clicks on <span> (x)
closeGameOverModal.onclick = function() {
    const modal = document.getElementById('game-over-modal');
    modal.style.display = "none";
    initGame(); // Restart game when modal is closed
}

// Close the win modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const winModal = document.getElementById('win-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    
    if (event.target === winModal) {
        winModal.style.display = "none";
        initGame(); // Restart game when modal is closed
    }
    if (event.target === gameOverModal) {
        gameOverModal.style.display = "none";
        initGame(); // Restart game when modal is closed
    }
}

// Close the win modal when the user clicks on <span> (x)
closeWinModal.onclick = function() {
    winModal.style.display = "none";
    initGame(); // Restart game when modal is closed
}

// Close the win modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === winModal) {
        winModal.style.display = "none";
        initGame(); // Restart game when modal is closed
    }
}

// Restart game
restartButton.addEventListener('click', initGame);

// Start the game
initGame();
