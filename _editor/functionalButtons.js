

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("playButton");
    
    button?.addEventListener("click", function () {
        saveCode();
        setTimeout(() => {
            window.open("../game/ss/index.html", "_blank", "width=800,height=600,menubar=no,toolbar=no,location=no,status=no");
        }, 500);
    });
});

const Vf = document.getElementById("Vf");
const Vt = document.getElementById("Vt");

Vf.addEventListener('click', () => {
    Visualization = false;
    cont.style.display = "none";

});

Vt.addEventListener('click', () => {
    Visualization = true;
    reloadIframe()
    cont.style.display = "block";
});