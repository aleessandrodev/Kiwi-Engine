import express from 'express';
import fs from 'fs';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import multer from "multer";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json({ limit: '10mb' }));
app.use(express.text({ limit: '10mb' }));

app.use(express.static(path.join(__dirname, '.')));
let Nname = "";
let name = "";

const nameRawData = fs.readFileSync('v.json', 'utf8');
const jsonNameData = JSON.parse(nameRawData);





const percorso = "game";
let nomiCartelle = [];
let contatore = 0;
let jsContent = `const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");`



app.post('/save/:type', (req, res) => {

    try {
        const raw = fs.readFileSync('v.json', 'utf8');
        const data = JSON.parse(raw);
        Nname = data.prjName;

        const type = req.params.type;
        const content = req.body;
        
        console.log(`Saving ${type} file with content length: ${content.length}`);
        
        if (type === 'html') {
            writeFileSync(`game/${Nname}/index.html`, content);
            writeFileSync(`game/${Nname}/index.txt`, content);

        } else if (type === 'css') {
            writeFileSync(`game/${Nname}/style.css`, content);
            writeFileSync(`game/${Nname}/style.txt`, content);
        } else if (type === 'js') {
            writeFileSync(`game/${Nname}/script.js`, content);
            writeFileSync(`game/${Nname}/script.txt`, content);
        } else {
            return res.status(400).send('Invalid file type');
        }
        
        res.send('File saved successfully!');
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).send('Error saving the file');
    }
});

app.post('/savetxt/:type', (req, res) => {

    try {
        const raw = fs.readFileSync('v.json', 'utf8');
        const data = JSON.parse(raw);
        Nname = data.prjName;

        const type = req.params.type;
        const content = req.body;
        
        console.log(`Saving ${type} file with content length: ${content.length}`);
        
        if (type === 'html') {
            writeFileSync(`game/${Nname}/index.txt`, content);
        } else if (type === 'css') {
            writeFileSync(`game/${Nname}/style.txt`, content);
        } else if (type === 'js') {
            writeFileSync(`game/${Nname}/script.txt`, content);
        } else {
            return res.status(400).send('Invalid file type');
        }
        
        res.send('File saved successfully!');
    } catch (error) {
        console.error('Error saving file:', error);
        res.status(500).send('Errore nel salvataggio del file');
    }
});


app.post('/createPrj/mkPrj', (req, res) => {
    try {
        const exampleValue = req.body.value;

        if(exampleValue == "Platform"){
            jsContent = fs.readFileSync('examples/platform.js', 'utf8');
        }else if(exampleValue == "4-Movement"){
            jsContent = fs.readFileSync('examples/4-movement.js', 'utf8');
        }else if(exampleValue == "Car"){
            jsContent = fs.readFileSync('examples/car.js', 'utf8');
        }


        name = req.body.name;
        if (!name) {
            return res.status(400).send('You must specify a valid folder name.');
        }

        const folderPath = path.join(__dirname, 'game', name);
        console.log(name)

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            fs.writeFileSync(`game/${name}/index.html`, `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title></title>
  </head>
  <body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
  </body>
  <script type="module" src="script.js"></script>
  <script src="../lenguage.js"></script>
</html>
`);
            fs.writeFileSync(`game/${name}/index.txt`, `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <title></title>
  </head>
  <body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
  </body>
  <script type="module" src="script.js"></script>
  <script src="../lenguage.js"></script>
</html>
`);
            fs.mkdirSync(`game/${name}/assets`, { recursive: true });
            fs.writeFileSync(`game/${name}/style.css`, "");
            fs.writeFileSync(`game/${name}/style.txt`, "");
            fs.writeFileSync(`game/${name}/script.js`, jsContent);
            fs.writeFileSync(`game/${name}/script.txt`, jsContent);

            const rawData = fs.readFileSync('v.json', 'utf8'); 
            const jsonData = JSON.parse(rawData);

            jsonData.prjName = name;
            fs.writeFileSync('v.json', JSON.stringify(jsonData, null, 2), 'utf8');

            return res.send(`Folder "${name}" successfully created in /game!`);
        } else {
            return res.status(400).send('The folder already exists.');
        }

    } catch (error) {
        console.error('Error creating folder: ', error);
        res.status(500).send('Error creating folder.');
    }
});


app.post('/updateJSON', async (req, res) => {

    try {
        const rawData = fs.readFileSync('v.json', 'utf8');
        let jsonData = JSON.parse(rawData);
        
        if (req.body.message) {
            jsonData.prjName = req.body.message;
        }
        
        fs.writeFileSync('v.json', JSON.stringify(jsonData, null, 2), 'utf8');
        res.json(jsonData);
    } catch (error) {
        console.error('Error updateJSON:', error);
        res.status(500).json({ error: 'EError processing v.json' });
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const raw = fs.readFileSync('v.json', 'utf8');
        const data = JSON.parse(raw);
        Nname = data.prjName;
        cb(null, `game/${Nname}/assets/`);  
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

app.post("/uploadfile", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file found");
    }
    res.send("File saved successfully!");
});


nomiCartelle = [];
contatore = 0;



const elementi = fs.readdirSync(percorso, { withFileTypes: true });
for (const elemento of elementi) {
    if (elemento.isDirectory()) {
        if (elemento.name === "ss" || elemento.name === "module") continue;

        nomiCartelle.push(elemento.name);
        contatore++;
    }
}

jsonNameData.nCartelle = contatore;
jsonNameData.nameCartelle = nomiCartelle;

fs.writeFileSync('v.json', JSON.stringify(jsonNameData, null, 2), 'utf8');


app.listen(3000, () => console.log('Server started on: http://localhost:3000'));