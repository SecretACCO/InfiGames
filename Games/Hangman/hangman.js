
let guessedLetters;
let wrongLetters;
const maxWrongGuesses = 6;

let selectedWord = localStorage.getItem('hangmanWord');
if (!selectedWord) {
    // Redirect to wordEntry.html if no word is found
    window.location.href = 'wordEntry.html';
} else {
    console.log(selectedWord); // Log the selected word for testing
    // Continue with the rest of your game logic
}

// Initialize game variables
guessedLetters = [];
wrongLetters = [];

// Start the game display
updateDisplay();

document.getElementById('guessButton').addEventListener('click', () => {
    const letterInput = document.getElementById('letterInput');
    const letter = letterInput.value.toLowerCase();

    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            wrongLetters.push(letter);
        }
    }

    letterInput.value = ''; // Clear input
    updateDisplay();
});

document.getElementById('restartButton').addEventListener('click', () => {
    localStorage.removeItem('hangmanWord'); // Clear the word from local storage
    window.location.href = 'wordEntry.html'; // Redirect to word entry page
});

function updateDisplay() {
    const wordDisplay = document.getElementById('wordDisplay');
    const wrongLettersDisplay = document.getElementById('wrongLetters');
    
    // Display current word with guessed letters
    wordDisplay.textContent = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    // Display wrong letters
    wrongLettersDisplay.textContent = `Wrong Letters: ${wrongLetters.join(', ')}`;

    // Check game status
    checkGameStatus();
}

function checkGameStatus() {
    const message = document.getElementById('message');
    if (wrongLetters.length >= maxWrongGuesses) {
        message.textContent = `Game Over! The word was "${selectedWord}".`;
        document.getElementById('restartButton').style.display = 'block';
    } else if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        message.textContent = 'Congratulations! You guessed the word!';
        document.getElementById('restartButton').style.display = 'block';
    }
}

// Start the game on load
console.log("The word to guess is:", selectedWord); // For testing purposes
