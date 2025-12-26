const fileInput = document.getElementById('fileInput');
const saveButton = document.getElementById("saveButton");

const saved = document.getElementById("saved");
const savedErr = document.getElementById("savedError");

const resizable = document.getElementById('dropzone');
const resizer = document.getElementById('resizerDrop');


const resizableBar = document.querySelector('.bar');
const resizerBar = document.getElementById('resizerBar');

const codeText = document.getElementById("codeText");

const menu = document.getElementById('customMenu');
const menuButton = document.getElementById('menuButton');
const optionsMenu = document.getElementById('optionsMenu');

const cont = document.getElementById("container");




let isResizing = false;
let Visualization = false;
let isResizingBar = false;

window.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('Codice');
});

let editor;

let typeCode = 0;

const box = document.getElementById("boxContaner")

let boxCont = "";
let container = "";
let containerID = "";

let prjName = "";
let boxName = "" 

fetch('../v.json')
  .then(response => response.json())
  .then(data => {
    prjName = data.prjName;
  });




function loadButton() {
    //saveCurrentToTxt();
    fetch(`../game/${prjName}/${boxName}.txt`)
        .then(response => {
            if (!response.ok) throw new Error('Errore nel caricamento del file');
            return response.text();
        })
        .then(data => editor.setValue(data))
        .catch(err => editor.setValue("Impossibile caricare il file.\n" + err));
    
    if(containerID === "ConteinerHTML"){
        typeCode = 0;
        reloadIframe()
        editor.setOption("mode", "htmlmixed");
        if(Visualization == true){
            cont.style.display = "block";
        }else{
            cont.style.display = "none";
        }
    }else if(containerID === "ConteinerCSS"){
        typeCode = 1;
        reloadIframe()
        editor.setOption("mode", "css");
        cont.style.display = "none";
    }else if(containerID === "ConteinerJS"){
        typeCode = 2;
        reloadIframe()
        editor.setOption("mode", "javascript");
        cont.style.display = "none";
    }
}



document.addEventListener("keydown", function(event){
    if((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s"){
        event.preventDefault();
        saveCode()

    }
})


document.querySelectorAll(".boxContainer").forEach(box => {
    box.addEventListener("click", function(event){
        if(event.target.tagName.toLowerCase() === "a"){
            boxName = event.target.textContent;

            boxCont = event.target.closest(".boxContainer");
            container = boxCont.closest("div[id]");
            containerID = container.id;
            loadButton();

            
        }
    });
});

function saveCurrentToTxt() {
    const content = editor.getValue();
    
    let currentType = '';
    if (typeCode === 0) {
        currentType = 'html';
        
    } else if (typeCode === 1) {
        currentType = 'css';
        
    } else if (typeCode === 2) {
        currentType = 'js';
        
    }
    
    if (!currentType) return;
    
    fetch(`/savetxt/${currentType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: content
    })
    .then(res => res.text())
}

saveButton?.addEventListener('click', () => {
    saveCode()
});

function saveCode(){
    const content = editor.getValue();
    let type = typeCode === 0 ? 'html' : typeCode === 1 ? 'css' : 'js';

    fetch(`/save/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: content
    })
    .then(res => res.text())
    .then(msg => {
        console.log('File saved successfully in the `assets/` folder.');
        saved.classList.add("attivo");

        setTimeout(()=>{
            saved.classList.remove("attivo")
        }, 3000)
    })
    .catch(err => {
        console.error('Error saving file:', err);
        savedErr.classList.add("attivo");

        setTimeout(()=>{
            savedErr.classList.remove("attivo")
        }, 3000)
    });
}

resizer.addEventListener('mousedown', function(e) {
  isResizing = true;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (!isResizing) return;

  const newWidth = resizable.offsetWidth - (e.movementX);
  if(newWidth > 50){ 
    resizable.style.width = newWidth + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isResizing = false;
  document.body.style.userSelect = 'auto';
});



//

resizerBar.addEventListener('mousedown', function(e) {
  isResizingBar = true;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (!isResizingBar) return;

  const newWidth = e.clientX - resizableBar.getBoundingClientRect().left;

  if(newWidth > 50){
    resizableBar.style.width = newWidth + 'px';
    updatePosition()
  }
});

document.addEventListener('mouseup', function() {
  isResizingBar = false;
  document.body.style.userSelect = 'auto';
});

function updatePosition() {
    const rect = resizableBar.getBoundingClientRect();
    const parentRect = codeText.parentElement.getBoundingClientRect();
    const targetX = rect.right - parentRect.left; 
    codeText.style.left = (targetX-120) + "px";
}

document.addEventListener('mousemove', function(e) {
  if (!isResizingBar) return;

  const newWidth = e.clientX - resizableBar.getBoundingClientRect().left;
  if(newWidth > 50){
    resizableBar.style.width = newWidth + 'px';
    updatePosition();
  }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); 

    menu.style.display = 'block';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
});

document.addEventListener('click', function() {
    menu.style.display = 'none';
});

let menuStatus = false;

menuButton.addEventListener('click', () => {
    if (!menuStatus) {
        optionsMenu.style.display = 'block';
        menuStatus = true;
    }
});

document.addEventListener('click', (event) => {
    if (menuStatus && !optionsMenu.contains(event.target) && event.target !== menuButton) {
        optionsMenu.style.display = 'none';
        menuStatus = false;
    }
});

resizable.addEventListener('dragover', (e) =>{
    e.preventDefault();
    resizable.style.backgroundColor = "#11141a";
});

dropzone.addEventListener("dragleave", () => {
    dropzone.style.backgroundColor = "#191d26";
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.backgroundColor = "#191d26";

    const file = e.dataTransfer.files[0];

    const formData = new FormData();
    formData.append("file", file);

    fetch("/uploadfile", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(msg => console.log(msg))
    .catch(err => console.error("Errore upload:", err));
});


function reloadIframe() {
    const viewer = document.getElementById("viewer");
    viewer.src = `../game/${prjName}/index.html`
    if (viewer && viewer.contentWindow) {
    viewer.contentWindow.location.reload(true);
    }
}
