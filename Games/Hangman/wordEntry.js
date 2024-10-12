document.getElementById('submitWordButton').addEventListener('click', () => {
    const wordInput = document.getElementById('wordInput').value.trim();
    if (wordInput) {
        localStorage.setItem('hangmanWord', wordInput.toLowerCase()); // Store the word in local storage
        window.location.href = 'hangman.html'; // Redirect to the hangman game
    } else {
        alert("Please enter a word.");
    }
});

// Optional: Allow pressing "Enter" to submit the word
document.getElementById('wordInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('submitWordButton').click();
    }
});
