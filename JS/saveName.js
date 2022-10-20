let player1Name = sessionStorage.getItem("player1Name");

let currentPlayer = player1Name;

const randomizer = (numero, letras = "Demonio ") => {
  return letras + numero;
};

let random = Math.floor(Math.random() * 999);

let result = randomizer(random);

let CPUName = result;


saludar();

function saludar() {
  playerWelcome.textContent = `Hola ${currentPlayer}!`;
  botName.textContent = `${result}`;
};

function savePlayer2Name() {
  let name2 = document.getElementById("player2Name").value;
  sessionStorage.setItem("player2Name",name2);

  let ifHuman2 = document.getElementById("typeRadio2").value;
  sessionStorage.setItem("player2Hum",ifHuman2);
};
