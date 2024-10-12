const playerScoreElement = document.getElementById('player-score');
const robotScoreElement = document.getElementById('robot-score');
const modal = document.getElementById('result-modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.getElementById('close-modal');

let playerScore = 0;
let robotScore = 0;

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.getAttribute('data-choice');
        const robotChoice = getRobotChoice();
        const winner = determineWinner(playerChoice, robotChoice);

        updateScores(winner);
        displayResult(playerChoice, robotChoice, winner);
    });
});

function getRobotChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, robot) {
    if (player === robot) return 'draw';
    if (
        (player === 'rock' && robot === 'scissors') ||
        (player === 'paper' && robot === 'rock') ||
        (player === 'scissors' && robot === 'paper')
    ) {
        return 'player';
    }
    return 'robot';
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner === 'robot') {
        robotScore++;
        robotScoreElement.textContent = robotScore;
    }
}

function displayResult(player, robot, winner) {
    let message;
    if (winner === 'draw') {
        message = `It's a draw! You both chose ${player}.`;
    } else {
        const winningChoice = winner === 'player' ? player : robot;
        message = `${winner === 'player' ? 'You win!' : 'Robot wins!'} ${capitalizeFirstLetter(winningChoice)} beats ${winner === 'player' ? robot : player}.`;
    }
    
    // Set modal message and display modal
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
