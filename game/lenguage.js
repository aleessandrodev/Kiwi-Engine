const square = document.getElementById("square");
const circle = document.getElementById("circle");

const gioco = document.getElementById("gioco");
let elementi = {square, circle};

function mono(){
    console.log("Funzione mono richiamata");

    const code = editor.getValue();
    const righe = code.split('\n');

    for (let riga of righe) {
        riga = riga.trim();

        if (riga.startsWith("canvas.width =")) {
            let valore = parseInt(riga.split('=')[1]);
            if (!isNaN(valore)) gioco.style.width = valore + "px";
        }

        if (riga.startsWith("canvas.height =")) {
            let valore = parseInt(riga.split('=')[1]);
            if (!isNaN(valore)) gioco.style.height = valore + "px";
        }

        if (riga.includes(".visible")) {
            let nome = riga.split('.')[0].trim();
            if (elementi[nome]) {
                elementi[nome].style.display = "block";
            }
        }

        if (riga.includes(".invisible")) {
            let nome = riga.split('.')[0].trim();
            if (elementi[nome]) {
                elementi[nome].style.display = "none";
            }
        }

        if (riga.includes(".x =")) {
            let nome = riga.split('.')[0].trim();
            let xPos = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(xPos)) {
                elementi[nome].style.left = xPos + "px";
            }
        }

        if (riga.includes(".y =")) {
            let nome = riga.split('.')[0].trim();
            let yPos = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(yPos)) {
                elementi[nome].style.top = yPos + "px";
            }
        }

        if (riga.includes(".width =")) {
            let nome = riga.split('.')[0].trim();
            let Ewidth = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(Ewidth)) {
                elementi[nome].style.width = Ewidth + "px";
            }
        }

        if (riga.includes(".height =")) {
            let nome = riga.split('.')[0].trim();
            let Eheight = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(Eheight)) {
                elementi[nome].style.height = Eheight + "px";
            }
        }

        if (riga.includes(".create =")) {
            let nome = riga.split('.')[0].trim();
            let tipo = riga.split('=')[1].trim().replace(/['"]+/g, '').toLowerCase();
            
            let nuovoElemento = document.createElement("div");
            nuovoElemento.id = nome;
            nuovoElemento.style.position = "absolute";
            nuovoElemento.style.display = "block";
            nuovoElemento.style.width = "40px";
            nuovoElemento.style.height = "40px";
            nuovoElemento.style.backgroundColor = "gray";
            nuovoElemento.style.top = "0px";
            nuovoElemento.style.left = "0px";

            if(tipo === "circle"){
                nuovoElemento.style.borderRadius = "50%";
            }
            
            // Aggiungi l'elemento al DOM
            if (gioco) {
                gioco.appendChild(nuovoElemento);
                elementi[nome] = nuovoElemento;
                console.log("Creato elemento:", nome);
            } else {
                console.error("Elemento #gioco non trovato!");
            }
        }

        if (riga.includes(".color =")) {
            let nome = riga.split('.')[0].trim();
            let colore = riga.split('=')[1].trim().replace(/['"]+/g, '');
            if (elementi[nome]) {
                elementi[nome].style.backgroundColor = colore;
                console.log("Impostato colore", colore, "per", nome);
            }
        }

        if (riga.includes(".image =")) {
            const [leftSide, rightSide] = riga.split('=').map(part => part.trim());
            const nome = leftSide.split('.')[0].trim();
            const image = rightSide.replace(/['"]+/g, '');
            
            if (elementi[nome]) {
                elementi[nome].style.backgroundImage = `url('${image}')`;
                elementi[nome].style.backgroundSize = "cover";
                elementi[nome].style.backgroundRepeat = "no-repeat";
            }
        }

        if (riga.includes("bgimage =")) {
            const [leftSide, rightSide] = riga.split('=').map(part => part.trim());
            const image = rightSide.replace(/['"]+/g, '');
            
            if (gioco) {
                gioco.style.backgroundImage = `url('${image}')`;
            }
        }

        if (riga.includes("bgimage.repete")) {
            if (gioco) {
                gioco.style.backgroundRepeat = "repeat";
            }
        }

        if (riga.includes("bgimage.width = ")) {
            let Wsizebg = parseInt(riga.split('=')[1]);
            if (gioco && !isNaN(Wsizebg)) {
                gioco.style.backgroundSize = Wsizebg + "px auto";
            }
        }

        if (riga.includes("bgimage.height = ")) {
            let Hsizebg = parseInt(riga.split('=')[1]);
            if (gioco && !isNaN(Hsizebg)) {
                gioco.style.backgroundSize = "auto " + Hsizebg + "px";
            }
        }
    }
    
    console.log("Parsing completato. Elementi:", Object.keys(elementi));
}

// Funzione per eseguire codice da una stringa (usata nella finestra del gioco)
function monoFromCode(code) {
    console.log("Eseguendo codice dal gioco:", code);
    
    const gioco = document.getElementById("gioco");
    let elementi = {};

    const righe = code.split('\n');

    for (let riga of righe) {
        riga = riga.trim();
        console.log("Processando riga:", riga);

        if (riga.startsWith("canvas.width =")) {
            let valore = parseInt(riga.split('=')[1]);
            if (!isNaN(valore) && gioco) gioco.style.width = valore + "px";
        }

        if (riga.startsWith("canvas.height =")) {
            let valore = parseInt(riga.split('=')[1]);
            if (!isNaN(valore) && gioco) gioco.style.height = valore + "px";
        }

        if (riga.includes(".create =")) {
            let nome = riga.split('.')[0].trim();
            let tipo = riga.split('=')[1].trim().replace(/['"]+/g, '').toLowerCase();
            
            let nuovoElemento = document.createElement("div");
            nuovoElemento.id = nome;
            nuovoElemento.style.position = "absolute";
            nuovoElemento.style.display = "block";
            nuovoElemento.style.width = "40px";
            nuovoElemento.style.height = "40px";
            nuovoElemento.style.backgroundColor = "gray";
            nuovoElemento.style.top = "0px";
            nuovoElemento.style.left = "0px";

            if(tipo === "circle"){
                nuovoElemento.style.borderRadius = "50%";
            }
            
            if (gioco) {
                gioco.appendChild(nuovoElemento);
                elementi[nome] = nuovoElemento;
                console.log("Creato elemento:", nome);
            } else {
                console.error("Elemento #gioco non trovato!");
            }
        }

        if (riga.includes(".color =")) {
            let nome = riga.split('.')[0].trim();
            let colore = riga.split('=')[1].trim().replace(/['"]+/g, '');
            if (elementi[nome]) {
                elementi[nome].style.backgroundColor = colore;
                console.log("Impostato colore", colore, "per", nome);
            }
        }

        if (riga.includes(".x =")) {
            let nome = riga.split('.')[0].trim();
            let xPos = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(xPos)) {
                elementi[nome].style.left = xPos + "px";
            }
        }

        if (riga.includes(".y =")) {
            let nome = riga.split('.')[0].trim();
            let yPos = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(yPos)) {
                elementi[nome].style.top = yPos + "px";
            }
        }

        if (riga.includes(".width =")) {
            let nome = riga.split('.')[0].trim();
            let Ewidth = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(Ewidth)) {
                elementi[nome].style.width = Ewidth + "px";
            }
        }

        if (riga.includes(".height =")) {
            let nome = riga.split('.')[0].trim();
            let Eheight = parseInt(riga.split('=')[1]);
            if (elementi[nome] && !isNaN(Eheight)) {
                elementi[nome].style.height = Eheight + "px";
            }
        }

        if (riga.includes(".visible")) {
            let nome = riga.split('.')[0].trim();
            if (elementi[nome]) {
                elementi[nome].style.display = "block";
            }
        }

        if (riga.includes(".invisible")) {
            let nome = riga.split('.')[0].trim();
            if (elementi[nome]) {
                elementi[nome].style.display = "none";
            }
        }

        if (riga.includes(".image =")) {
            const [leftSide, rightSide] = riga.split('=').map(part => part.trim());
            const nome = leftSide.split('.')[0].trim();
            const image = rightSide.replace(/['"]+/g, '');
            
            if (elementi[nome]) {
                elementi[nome].style.backgroundImage = `url('${image}')`;
                elementi[nome].style.backgroundSize = "cover";
                elementi[nome].style.backgroundRepeat = "no-repeat";
            }
        }

        if (riga.includes("bgimage =")) {
            const [leftSide, rightSide] = riga.split('=').map(part => part.trim());
            const image = rightSide.replace(/['"]+/g, '');
            
            if (gioco) {
                gioco.style.backgroundImage = `url('${image}')`;
            }
        }
    }
    
    console.log("Parsing completato. Elementi creati:", Object.keys(elementi));
}

if (window.location.pathname.includes('game/index.html')) {
    window.addEventListener('load', function() {
        console.log("Pagina gioco caricata, eseguendo mono...");
        fetch('script.js')
            .then(response => response.text())
            .then(code => {
                monoFromCode(code);
            })
            .catch(error => {
                console.error("Errore nel caricamento di script.js:", error);
            });
    });
}