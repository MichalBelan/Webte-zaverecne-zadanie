var modalBtn = document.getElementById('modalBtn');
var modal = document.getElementById('modal');
var zatvorX = document.getElementById('zatvorX');

modalBtn.onclick = function() {
  modal.style.display = "block";
}

zatvorX.onclick = function() {
  modal.style.display = "none";
}