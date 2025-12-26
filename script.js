let newProject = document.getElementById("prj")
let createProject = document.getElementById("downElements")
let nameProject = document.getElementById("namePrj").value

let nCartelle = 0;
let nameCartelle = [];

const containerPrj = document.getElementById('impPrj');

let openPrj;
let valueExample;

jsonV()
createProject.addEventListener('click', () => {
	valueExample = document.getElementById('optExamples').value;
	nameProject = document.getElementById("namePrj").value

	fetch('createPrj/mkPrj', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' }, 
	    body: JSON.stringify({ name: nameProject,  value: valueExample })       
})
.then(res => res.text())
.then(data => console.log(data))
.catch(err => console.error(err));
window.location.href = window.location.origin + window.location.pathname + "_editor/index.html";
});

async function jsonV(){
	const response = await fetch('../v.json');
	const data = await response.json();
	nCartelle = data.nCartelle;
	nameCartelle = data.nameCartelle;
	console.log(nameCartelle)
	console.log(nCartelle)
	crea()
}
let openNamePrj = "";
function crea(){
	if(nCartelle && nCartelle !== 0){
		for (let i = 0; i < nCartelle; i++) {
		    const newDiv = document.createElement('div');
		    newDiv.id = nameCartelle[i];
		    newDiv.className = 'openPrj'
		    newDiv.innerHTML = `<button>Project name:<span>${nameCartelle[i]}</span></button>`;
		    containerPrj.appendChild(newDiv);

		}
		const pulsanti = document.querySelectorAll('.openPrj');
		pulsanti.forEach(pulsante => {
		pulsante.addEventListener('click', () => {
			const idPulsante = pulsante.id;
			

			fetch('/updateJSON', {
			    method: 'POST',
			    headers: { 'Content-Type': 'application/json' },
			    body: JSON.stringify({ message: idPulsante })
			})
			.then(response => response.json())
			.then(data => {
				console.log('v.json aggiornato:', data);
				window.location.href = window.location.origin + window.location.pathname + "_editor/index.html";
			})
			.catch(err => console.error('Errore fetch:', err));
			
			})
		});

	}
}



