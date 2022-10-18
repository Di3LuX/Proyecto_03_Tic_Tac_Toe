let player1Name = sessionStorage.getItem("playerXName")
let player2Name = sessionStorage.getItem("playerOName")

let ifHuman1 = sessionStorage.getItem("player1Hum")
let ifHuman2 = sessionStorage.getItem("player2Hum")

const randomizer = (numero, letras = "Arcangel ") => letras + numero;

let random = Math.floor(Math.random() * 999);

let result = randomizer(random);

let CPUName = result;

class Player {
    //PROPIEDADES
    constructor(name, mark) {
        // dentro del constructor instanciaremos las clases
        this.name = name;
        this.mark = mark;
        this.flag = 3;
        // cualquier propiedad dentro de la clase, viene referenciada con el this.
    };
};
//Instanciamos a 3 jugadores con 2 variables que seran nombre y marca, y 3 turnos fijos.
let player1 = new Player(player1Name, "X");
let player2 = new Player(player2Name, "O");
let player3CPU = new Player(CPUName, "O");


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
let currentPlayer = "X";
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
};
function cellClicked() {
    console.log(flag)
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
};
function updateCell(cell, index) {
    // aqui, siempre y cuando los turnos sean mayores que 1, asignare el indice y el simbolo 
    // a la casilla clicada
    if (flag >= 1) {
        console.log("dada");

        if (voidArray[index] == "") {
            voidArray[index] = currentPlayer;
            cell.textContent = currentPlayer;
            flag--;
            changePlayer();
        }
    } else {
        if (voidArray[index] == currentPlayer && cell.textContent == currentPlayer) {
            console.log("dada");
            voidArray[index] = "";
            cell.textContent = "";
            flag++;
            console.log(flag);
        };
    };
};

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Es el turno de ${currentPlayer}`;
};
function checkWinner() {
    //al hacer la comprobacion, victoria sera false hasta que el bucle for siguiente encuentre una condicion de 
    //victoria valida
    let victory = false;
    // con un el bucle for recorreremos la array multidimensional usando la propiedad .length
    for (let i = 0; i < victoryConditions.length; i++) {
        // crearemos una variable temporal a la que le añadiremos a las condiciones de victoria
        // un array con nuestro indice
        const condition = victoryConditions[i];
        const cellA = voidArray[condition[0]];
        const cellB = voidArray[condition[1]];
        const cellC = voidArray[condition[2]];
        /*
        aqui iteramos sobre el interior del array de "victoryConditions"
        creamos una condicion de indice que ira recorriendo una a una las posiciones del "voidArray"
        hasta encontrar semejanza.
        si indice 0,1,2 no son espacios y son todas iguales, significara que alguien gana
        en caso contrario, seguira recorriendo el orden del array de "victoryConditions"
            [0, 1, 2], primera vez
            [3, 4, 5], segunda vez
            [6, 7, 8], ...
            [0, 3, 6], ...
        y asi con sus posiciones de indice en el array
        */
        // si cellA esta vacia o cellB esta vacia o cellC esta vacia, continuara...
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        // en su defecto si A es igual a B y B es igual a C, habra un ganador y victoria sera true!
        if (cellA == cellB && cellB == cellC) {
            victory = true;
            break;
        }
    }

    if (victory) {
        statusText.textContent = `${currentPlayer} gana!!`;
        running = false;
    }
    // comento la funcion de empate, ya que solo se pueden utilizar 3 fichas por jugador
    else if (!voidArray.includes("")) {
        statusText.textContent = `Empate!`;
        running = false;
    }
    else {
        // changePlayer();
    }
}
//  cree un boton de reinicio que limpia las celdas, restaura los turnos y el nombre del jugador acutal
function restartGame() {
    currentPlayer = "X";
    voidArray = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    flag = 6
    running = true;
}