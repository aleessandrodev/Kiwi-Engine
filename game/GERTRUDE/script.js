import * as std from '../module/standard.js';
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function update() {
    console.log("ciaooo");
    std.wait(2000);
}


function draw() {
    
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

