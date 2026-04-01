import * as std from '../module/standard.js';
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function update(time) {
    if(std.delay("timer1", 3000, time)){
        console.log("CIAO (trigger)");
    }
    
}


function draw() {
    
}
requestAnimationFrame(gameLoop);
function gameLoop(time) {
    std.Input.update();
    update(time);
    draw();
    requestAnimationFrame(gameLoop);
}


