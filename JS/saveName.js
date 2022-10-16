const startGame = () => {
	function saveName() {

		let name1 = document.getElementById("player1Name");
		let name2 = document.getElementById("player2Name");
		let player1 = name1.value;
		let player2 = name2.value;

		sessionStorage.setItem("player1Name", player1);
		sessionStorage.setItem("player2Name", player2);

		let check1 = document.querySelector('input[name="typeRadio1"]:checked')
		let check2 = document.querySelector('input[name="typeRadio2"]:checked')

		sessionStorage.setItem('playerX', JSON.stringify(player1))
		sessionStorage.setItem('playerO', JSON.stringify(player2))

		let player1Data = JSON.parse(sessionStorage.getItem('playerX'))
		let player2Data = JSON.parse(sessionStorage.getItem('playerO'))

		player1.innerHTML = `El jugador 1 es ${player1Data.nombre}`
		player2.innerHTML = `El jugador 2 es ${player2Data.nombre}`
	};
};