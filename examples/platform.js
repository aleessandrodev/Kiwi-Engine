const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player object
const player = {
    x: 50,
    y: 50,
    width: 30,
    height: 40,
    color: "red",
    velX: 0,       // horizontal speed
    velY: 0,       // vertical speed
    speed: 3,      // walking speed
    jumpForce: 8,  // how strong the jump is
    onGround: false
};

// Physics
const gravity = 0.4;

// Simple platform
const platform = {
    x: 50,
    y: 300,
    width: 300,
    height: 20,
    color: "green"
};

// Input handler
const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);


// -------------------- UPDATE --------------------
function update() {

    // Horizontal movement
    if (keys["ArrowLeft"]) player.velX = -player.speed;
    else if (keys["ArrowRight"]) player.velX = player.speed;
    else player.velX = 0;

    // Jump
    if (keys[" "] && player.onGround) {
        player.velY = -player.jumpForce;
        player.onGround = false;
    }

    // Apply gravity
    player.velY += gravity;

    // Apply movement
    player.x += player.velX;
    player.y += player.velY;

    // -------- Ground/platform collision --------
    if (isColliding(player, platform)) {

        // Snap player to the top of the platform
        player.y = platform.y - player.height;

        // Stop downward motion
        player.velY = 0;

        // Player is on the ground
        player.onGround = true;
    } else {
        player.onGround = false;
    }

    // Prevent falling through the bottom of the canvas
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velY = 0;
        player.onGround = true;
    }
}


// -------------------- DRAW --------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw platform
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}


// Simple AABB collision
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}


// -------------------- GAME LOOP --------------------
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
