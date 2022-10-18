function saveName() {
    let name1 = document.getElementById("player1Name").value;
    let name2 = document.getElementById("player2Name").value;

    sessionStorage.setItem("player1Name",name1);
    sessionStorage.setItem("player2Name",name2);

    let ifHuman1 = document.getElementById("typeRadio1").value;
    let ifHuman2 = document.getElementById("typeRadio2").value;

    sessionStorage.setItem("player1Hum",ifHuman1);
    sessionStorage.setItem("player2Hum",ifHuman2);
};