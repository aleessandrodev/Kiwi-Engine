const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Car object
const car = {
    x: 150,
    y: 150,
    width: 40,
    height: 20,
    speed: 3,
    angle: 0 // angle in radians
};

// Keyboard input
const keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// Update function
function update() {

    // Move forward
    if (keys["ArrowUp"]) {
        car.x += Math.cos(car.angle) * car.speed;
        car.y += Math.sin(car.angle) * car.speed;
    }

    // Move backward
    if (keys["ArrowDown"]) {
        car.x -= Math.cos(car.angle) * car.speed;
        car.y -= Math.sin(car.angle) * car.speed;
    }

    // Rotate left
    if (keys["ArrowLeft"]) {
        car.angle -= 0.05; // rotation speed
    }

    // Rotate right
    if (keys["ArrowRight"]) {
        car.angle += 0.05;
    }
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save current canvas state before rotating
    ctx.save();

    // Move canvas origin to car center
    ctx.translate(car.x, car.y);

    // Rotate canvas
    ctx.rotate(car.angle);

    // Draw car rectangle centered
    ctx.fillStyle = "red";
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);

    // Restore original canvas state
    ctx.restore();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
