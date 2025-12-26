const viewer = document.getElementById("viewer");
const overlay = document.getElementById("overlay");

let pan = { x: 0, y: 0 };
let scale = 1;

let isPanning = false;
let start = { x:0, y:0, panX:0, panY:0 };
let name = "";

fetch('../v.json')
  .then(response => response.json())
  .then(data => {
    name = data.prjName;
    if (name){
      viewer.src = `../game/${name}/index.html`;
    }
});



overlay.addEventListener("pointerdown", e => {
  isPanning = true;
  overlay.setPointerCapture(e.pointerId);
  start.x = e.clientX;
  start.y = e.clientY;
  start.panX = pan.x;
  start.panY = pan.y;
  overlay.style.cursor = "grabbing";
});

overlay.addEventListener("pointermove", e => {
  if (!isPanning) return;
  pan.x = start.panX + (e.clientX - start.x);
  pan.y = start.panY + (e.clientY - start.y);
  updateTransform();
});

overlay.addEventListener("pointerup", e => {
  isPanning = false;
  overlay.style.cursor = "grab";
  overlay.releasePointerCapture(e.pointerId);
});


overlay.addEventListener("wheel", e => {
  e.preventDefault();

  const rect = overlay.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const worldX = (mx - pan.x) / scale;
  const worldY = (my - pan.y) / scale;

  const zoomFactor = Math.exp(-e.deltaY * 0.0015);
  scale *= zoomFactor;

  pan.x = mx - worldX * scale;
  pan.y = my - worldY * scale;

  updateTransform();
}, { passive:false });

function updateTransform() {
  viewer.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
}

