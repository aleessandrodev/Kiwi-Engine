const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player object
const player = {
    x: 50,        // Player X position
    y: 50,        // Player Y position
    width: 30,    // Player size (width)
    height: 30,   // Player size (height)
    speed: 4,     // Movement speed
    color: "red"  // Player color
};

// Stores pressed keys
const keys = {};

// Listen for key press
window.addEventListener("keydown", (e) => {
    keys[e.key] = true; // Mark this key as pressed
});

// Listen for key release
window.addEventListener("keyup", (e) => {
    keys[e.key] = false; // Mark this key as no longer pressed
});

// Update player movement and logic
function update() {

    // --- 4 DIRECTIONS MOVEMENT ---
    // Moving UP
    if (keys["ArrowUp"]) {
        player.y -= player.speed;
    }

    // Moving DOWN
    if (keys["ArrowDown"]) {
        player.y += player.speed;
    }

    // Moving LEFT
    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    // Moving RIGHT
    if (keys["ArrowRight"]) {
        player.x += player.speed;
    }

    // --- SIMPLE WALL COLLISION ---
    // Prevents the player from exiting the canvas
    if (player.x < 0) player.x = 0;  
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// Draw everything to the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clean the screen

    // Draw the player square
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Game loop (runs every frame)
function gameLoop() {
    update();  // Update game logic
    draw();    // Render graphics
    requestAnimationFrame(gameLoop); // Continue loop
}

gameLoop(); // Start the loop
