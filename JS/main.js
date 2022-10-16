// trabajaremos con constantes que ya nos obtendran el valor de los divs en html con el id especificado
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// aqui una array con las variaciones de filas/columnas que necesitaremos para conseguir la victoria
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

// aqui una array con 9 posiciones vacias, util para llamarla y movernos libremente por las casillas
let voidArray = ["", "", "", "", "", "", "", "", ""];
// player comenzara siendo "O" y cambiara cada turno (en caso de humano vs humano)
let currentPlayer = "O";
// el juego comenzara con la variable "running" en falso hasta que inizialicemos el juego
let running = false;
// aqui utilizare un contador de turnos de 6, que restara por cada vez que posicionemos ficha
let flag = 6;

initializeGame();

function initializeGame() {
    /* aqui usando el "forEach" decimos que por cada "cell" le añada el metodo "addEventListener" 
    del click y hacermos un callback a la casilla clickada, cual llamaremos mas tarde*/
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // añadimos el boton de reinicio de partida desde el principio con un callback a "restartgame"
    restartBtn.addEventListener("click", restartGame);
    // con .textContent modificaremos el texto del div con id "statusText" para que nos indique
    // de quien es el turno
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    // aqui hacemos que cuando el juego inizialice cambie a verdadero
    running = true;
}
function cellClicked() {
    /*
    aqui creo una constante para asignarle un atributo a cada casilla cuando esta sea clickada
    ese atributo sera el mismo "cellIndex" es decir, por cada click se asignara un indice en 
    voidArray, dando a esa casilla vacia, una posicion en dicha array.
    */
    const cellIndex = this.getAttribute("cellIndex");
    if (voidArray[cellIndex] != "" || !running) {
        return;
    };
    // "si" el array de casillas no es igual a vacio o el juego no esta en marcha, no hagas nada y vuelve 
    updateCell(this, cellIndex);
    checkWinner();
    // "si no" llama a la funcion "updateCell" con el argumento this asi como cellIndex
    // seguido de la funcion checkWinner
}
function updateCell(cell, index) {
    if (flag >= 1) {
    voidArray[index] = currentPlayer;
    cell.textContent = currentPlayer;
    flag--
}
}
function changePlayer() {

    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Es el turno de ${currentPlayer}`;
}
function checkWinner() {
    let victory = false;

    for (let i = 0; i < victoryConditions.length; i++) {
        const condition = victoryConditions[i];
        const cellA = voidArray[condition[0]];
        const cellB = voidArray[condition[1]];
        const cellC = voidArray[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            victory = true;
            break;
        }
    }

    if (victory) {
        statusText.textContent = `${currentPlayer} gana!!`;
        running = false;
    }
    // else if (!voidArray.includes("")) {
    //     statusText.textContent = `Empate!`;
    //     running = false;
    // }
    else {
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "X";
    voidArray = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    flag = 6
    running = true;
};