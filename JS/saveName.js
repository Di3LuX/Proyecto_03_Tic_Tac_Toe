
function saveMainName() {
  let name1 = document.getElementById("player1Name").value;
  if (name1 == "") {
    alert('Hey! Se te olvido introducir tu nombre...');
  } else {
    window.location.href = "./Pages/mainMenu.html"
    sessionStorage.setItem("player1Name", name1);
  };
};