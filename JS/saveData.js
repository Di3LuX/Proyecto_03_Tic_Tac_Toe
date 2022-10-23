let player1Name = sessionStorage.getItem("player1Name");
let currentPlayer = player1Name;

let ifHuman = document.querySelector('input[name="checkHuman"]:checked')
let ifAI = document.querySelector('input[name="checkAI"]:checked')

const randomizer = (numero, letras = "Slayer ") => {
  return letras + numero;
};

let random = Math.floor(Math.random() * 999);

let result = randomizer(random);

let CPUName = result;


saludar();

function saludar() {
  playerWelcome.textContent = `Bienvenido ${currentPlayer}!`;
  botName.textContent = `${result}`;
};

function saveGameData() {

  let name2 = document.getElementById("player2Name").value;
  let ifHuman = document.getElementById("checkHuman").value;
  let ifAI = document.getElementById("checkAI").value;
 
  if (name2 == "") {
    alert('No escribiste ningun nombre para el jugador 2 humano...');
  } else {
  sessionStorage.setItem("player2Name", name2);
  sessionStorage.setItem("player2Hum", ifHuman);
  sessionStorage.setItem("player2AI", ifAI);
  window.location.href = "./game.html"
  };
};