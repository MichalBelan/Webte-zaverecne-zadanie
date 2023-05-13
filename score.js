var zoznamSkore = document.getElementById("zoznamSkore");
var najlepsi = JSON.parse(localStorage.getItem("najlepsi")) || [];

zoznamSkore.innerHTML = najlepsi
  .map(score => {
    return `<li class="high-score">${score.name} : ${score.score}</li>`;
  })
  .join("");