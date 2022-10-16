function saveName() {
    let name1 = document.getElementById("player1Name");
    let name2 = document.getElementById("player2Name");
    let player1 = sessionStorage.setItem(name1.value);
    let player2 = sessionStorage.setItem(name2.value);
    sessionStorage.setItem("playerXName", JSON.stringify(player1));
    sessionStorage.setItem("playerOName", JSON.stringify(player2));

    let player1Data = JSON.parse(sessionStorage.getItem("playerXName"));
    let player2Data = JSON.parse(sessionStorage.getItem("playerOName"));

    player1Name.innerHTML = `Turno de ${player1Data}`;
    player1Name.innerHTML = `Turno de ${player2Data}`;
};