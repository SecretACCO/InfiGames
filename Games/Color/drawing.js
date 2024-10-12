const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const submitButton = document.getElementById('submitDrawing');
const resultDiv = document.getElementById('result');
const timerDisplay = document.getElementById('time');
const aiImage = document.getElementById('aiImage');
let timer;
let timeLeft = 60; // Set default time to 60 seconds
let aiImageData; // To store AI image data for comparison

// Function to generate random time (between 2 to 10 minutes)
function generateRandomTime() {
    return Math.floor(Math.random() * (600 - 120 + 1) + 120); // Random time between 120 and 600 seconds
}

// Function to randomly select an image from the Images folder
function selectRandomImage() {
    const images = ['image.png', 'image.png', 'image.png', 'image.png']; // List of image files
    const randomImage = images[Math.floor(Math.random() * images.length)];
    aiImage.src = `file:///C:/Users/mehul/Downloads/InfiGames/Image/${randomImage}`; // Set AI image source
    aiImage.onload = () => {
        aiImageData = getImageData(aiImage); // Get AI image data once it's loaded
    }; 
}
// Function to generate random similarity score
function generateRandomScore() {
    return Math.floor(Math.random() * 101); // Random score between 0 and 100
}

// Initialize the game
function initGame() {
    canvas.width = 300;
    canvas.height = 300;

    // Set up canvas drawing
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Start the timer
    timeLeft = 60; // Reset time
    startTimer();
}

// Initialize mouse position
let drawing = false;

// Function to start drawing
canvas.addEventListener('mousedown', (event) => {
    drawing = true; // Set drawing to true
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(event.offsetX, event.offsetY); // Move to the cursor position
});

canvas.addEventListener('mouseup', () => {
    drawing = false; // Set drawing to false
    ctx.closePath();
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return; // If not drawing, exit the function
    ctx.lineTo(event.offsetX, event.offsetY); // Connect to the cursor position
    ctx.strokeStyle = 'black'; // Black drawing color
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.moveTo(event.offsetX, event.offsetY); // Move the path to the current position
});

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            resultDiv.textContent = "Time's up! Please submit your drawing.";
            submitButton.disabled = true; // Disable the submit button after time's up
        } else {
            timeLeft--;
            timerDisplay.textContent = timeLeft; // Update the timer display
        }
    }, 1000);
}

submitButton.addEventListener('click', () => {
    clearInterval(timer);

    // Generate a random similarity score between 0 and 100
    const similarityScore = generateRandomScore();
    resultDiv.textContent = `You submitted your drawing! Random Similarity Score: ${similarityScore}%`;
});

// Start the game
initGame();