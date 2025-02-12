const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const rows = 12;
const cols = 15;
const tileSize = 80;

canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

// Load images
const wallImage = new Image();
wallImage.src = "./images/wallImg.png"; // Wall image

const walkwayImage = new Image();
walkwayImage.src = "./images/walkwayImg.png"; // Walkway image

const playerImage = new Image();
playerImage.src = "./images/kikoImg.png"; // Kiko image as the player

const whiteHeartImage = new Image();
whiteHeartImage.src = "https://media.tenor.com/wnVuzMq9fYsAAAAi/love-heart.gif"; // White heart GIF for winning

const buzzBallImage = new Image();
buzzBallImage.src = "images/buzzball.png"; // Buzz ball image as obstacle

// Maze definition (1 = wall, 0 = walkway)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];



// Initial positions
const player = { x: 1, y: 1 };       // Player starting position
const whiteHeartPos = { x: 13, y: 10 }; // White heart position (winning point)
const buzzBallPos = { x: 6, y: 4 };  // Buzz ball position (obstacle)
const buzzBall2Pos = { x: 3, y: 6 };  // Buzz ball 2 position (obstacle)

let gameStarted = false;

// Draw the maze function
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.drawImage(wallImage, x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                ctx.drawImage(walkwayImage, x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw the white heart (winning point)
    ctx.drawImage(whiteHeartImage, whiteHeartPos.x * tileSize, whiteHeartPos.y * tileSize, tileSize, tileSize);

    // Draw the buzz ball (obstacle)
    ctx.drawImage(buzzBallImage, buzzBallPos.x * tileSize, buzzBallPos.y * tileSize, tileSize, tileSize);
    ctx.drawImage(buzzBallImage, buzzBall2Pos.x * tileSize, buzzBall2Pos.y * tileSize, tileSize, tileSize);

    // Draw the player
    ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Move player
function movePlayer(dx, dy) {
    if (!gameStarted) return;

    let newX = player.x + dx;
    let newY = player.y + dy;

    // Check within boundaries and not a wall
    if (
        newX >= 0 &&
        newX < cols &&
        newY >= 0 &&
        newY < rows &&
        maze[newY][newX] === 0
    ) {
        player.x = newX;
        player.y = newY;

        // Win condition
        if (player.x === whiteHeartPos.x && player.y === whiteHeartPos.y) {
            showWinContent();
        }

        // Obstacle condition
        if (player.x === buzzBallPos.x && player.y === buzzBallPos.y) {
            showGameOver();
        }

        drawMaze();
    }
}

// Show win content
function showWinContent() {
    // Redirect to another HTML page (e.g., success.html)
    window.location.href = "success.html";
}

// Show game over screen
function showGameOver() {
    document.getElementById("game-over-screen").style.display = "block";
    gameStarted = false;
}

// Start game
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
    gameStarted = true;
    player.x = 1;
    player.y = 1;
    drawMaze();
}

// Restart game
function restartGame() {
    document.getElementById("game-over-screen").style.display = "none";
    startGame();
}

// Keyboard events
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":    movePlayer(0, -1); break;
        case "ArrowDown":  movePlayer(0,  1); break;
        case "ArrowLeft":  movePlayer(-1, 0); break;
        case "ArrowRight": movePlayer(1,  0); break;
    }
});

// On images load, draw the maze
wallImage.onload = drawMaze;
walkwayImage.onload = drawMaze;
playerImage.onload = drawMaze;
whiteHeartImage.onload = drawMaze;
buzzBallImage.onload = drawMaze;