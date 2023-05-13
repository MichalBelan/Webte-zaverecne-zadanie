var hrac = document.getElementById('hrac');
var btnSkore = document.getElementById('btnSkore');
var finalne = document.getElementById('finalne');
var najnovsieSkore = localStorage.getItem('mostRecentScore');
var najlepsi = JSON.parse(localStorage.getItem('najlepsi')) || [];
var MAX_HIGH_SCORES = 5;

finalne.innerText = najnovsieSkore;

hrac.addEventListener('keyup', () => {
    btnSkore.disabled = !hrac.value;
});

ulozSkore = (e) => {
    e.preventDefault();

    var score = {
        score: najnovsieSkore,
        name: hrac.value,
    };
    najlepsi.push(score);
    najlepsi.sort((a, b) => b.score - a.score);
    najlepsi.splice(5);

    localStorage.setItem('najlepsi', JSON.stringify(najlepsi));
    window.location.assign('index.html');
};

