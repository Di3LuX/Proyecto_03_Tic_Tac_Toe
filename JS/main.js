const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let voidArray = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let running = false;
let flag = 6;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (voidArray[cellIndex] != "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    voidArray[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {

    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Es el turno de ${currentPlayer}`;
}
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = voidArray[condition[0]];
        const cellB = voidArray[condition[1]];
        const cellC = voidArray[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} gana!!`;
        running = false;
    }
    else if (!voidArray.includes("")) {
        statusText.textContent = `Empate!`;
        running = false;
    }
    else {
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "X";
    voidArray = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
};