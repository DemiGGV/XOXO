const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const fieldEl = document.querySelector(".field");
const tabloEl = document.querySelectorAll(".tablo");
const resetButton = document.querySelector(".js-reset");
const playerXCount = document.querySelector(".score1");
const playerOCount = document.querySelector(".score2");
const winnerEl = document.querySelector(".winnerID");
const historyX = [];
const historyO = [];
const fieldMarkup = createGameField();
const cross = "<img src='./img/cross.png' class='cross'></img>";
const okay = "<img src='./img/ok.png' class='ok'></img>";
let player = true;

function createGameField() {
  let markup = "";
  for (let i = 1; i <= 9; i++) {
    markup += `<div class="field-cell" data-fill data-id="${i}"></div>`;
  }
  return markup;
}

fieldEl.innerHTML = fieldMarkup;

fieldEl.addEventListener("click", onClickGalleryItem);
resetButton.addEventListener("click", resetField);

function onClickGalleryItem(e) {
  if (!e.target.hasAttribute("data-fill")) {
    return;
  }
  if (player) {
    e.target.innerHTML = cross;
    historyX.push(Number(e.target.dataset.id));
    checkWin(isWinner(historyX), playerXCount, "Player 1!");
    player = !player;
  } else {
    e.target.innerHTML = okay;
    historyO.push(Number(e.target.dataset.id));
    checkWin(isWinner(historyO), playerOCount, "Player 2!");
    player = !player;
  }
  changeActivePlayer();
  if (historyO.length + historyX.length === 9) {
    withDraw();
  }
}
function changeActivePlayer() {
  tabloEl.forEach((tag) => tag.classList.toggle("active"));
}
function isWinner(arr) {
  return winCombinations.some((winTriplet) =>
    winTriplet.every((streak) => arr.includes(streak))
  );
}
function checkWin(bool, winner, name) {
  if (!bool) {
    return;
  }
  winner.textContent = Number(winner.textContent) + 1;
  fieldEl.removeEventListener("click", onClickGalleryItem);
  winnerEl.textContent = `The winner is ${name} Again?`;
}
function withDraw() {
  fieldEl.removeEventListener("click", onClickGalleryItem);
  winnerEl.textContent = `WITHDRAW! Again?`;
}
function resetField() {
  for (const child of fieldEl.children) {
    child.innerHTML = "";
  }
  historyX.length = 0;
  historyO.length = 0;
  winnerEl.textContent = "";
  fieldEl.addEventListener("click", onClickGalleryItem);
}
