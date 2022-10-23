let player1Name = sessionStorage.getItem("player1Name");
let player2Name = sessionStorage.getItem("player2Name");
let ifHuman2 = sessionStorage.getItem("player2Hum");
class Player {

  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
    this.turn = 3;
  };
};
let player1 = new Player(player1Name, "X");
let player2 = new Player(player2Name, "O");
// let player3CPU = new Player(CPUName, "O");


const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText"); // getElelemtbyid es mas optimo
const restartBtn = document.querySelector("#restartBtn");

const victoryConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentPlayerName = player1Name;
let running = false;
let turn = 6;
initializeGame();

function restartGame() {
  currentPlayer = "X";
  currentPlayerName = player1Name;
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Es el turno de ${currentPlayerName} / "X"`;
  cells.forEach(cell => cell.textContent = "");
  turn = 6;
  running = true;
};

function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Es el turno de ${currentPlayerName} / "X"`;
  running = true;
};

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if ((turn > 0) && (board[cellIndex] != "" || !running)) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
  };
  updateCell(this, cellIndex);
  checkWinner();
};
function updateCell(cell, index) {

  if (turn > 0) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    turn--;
    changePlayer();
  } else {
    if ((board[index] == currentPlayer) && (running == true)) {
      board[index] = "";
      cell.textContent = "";
      turn++;
    } else {
    };
  };
};

function changePlayer() {
  if (running == true) {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    currentPlayerName = (currentPlayerName == `${player2Name} / "O"`) ? `${player1Name} / "X"` : `${player2Name} / "O"`;
    statusText.textContent = `Es el turno de ${currentPlayerName}`;
  };
};
function checkWinner() {

  let victory = false;

  for (let i = 0; i < victoryConditions.length; i++) {

    const condition = victoryConditions[i];
    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    };
    if (cellA == cellB && cellB == cellC) {
      victory = true;
      break;
    };
  };

  if (victory) {

    changePlayer()
    let winner = currentPlayer == "X" ? player1Name : player2Name;

    sessionStorage.setItem("currentWinner", winner);

    running = false;

    window.location.href = "./winner.html";

  };
};
