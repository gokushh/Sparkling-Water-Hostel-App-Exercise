const signIn = document.querySelector(".signIn");
const signOut = document.querySelector(".signUp");
const homeButton = document.querySelector(".homeButton");
const reserveButton = document.querySelector(".reserveButton")

/**
 * Ao abrir a pagina, verifica se esta logado para colocar as opcoes de log out e user
 */
function isLogged() {
  //recupera a variavel logged
  var logged = sessionStorage.getItem("logged");
  var manager = sessionStorage.getItem("manager");
  /** Vale a pena mostrar esse teste na apresentacao */
  console.log(logged);
  console.log(manager);

  if (logged === "true") {
    console.log(1);

    //se for manager, adciona um botao e exclui outros
    var manager = sessionStorage.getItem("manager");
    if (manager === "true") {
      console.log(5);
      homeButton.href = "../adm_manage_guest.html"; //Local onde sera disponivel a visualizacao dos hospedes
      homeButton.textContent = "Guests";
    }

    //Habilita a pagina de reservas
    reserveButton.href = "../reservation.html";

    //remove os botoes sign e adciona User e LogOut
    signIn.href = "#";
    signIn.textContent = "||";

    console.log(4);

    signOut.href = "../sign-in.html";
    signOut.textContent = "LogOut";

    signOut.addEventListener("click", logOutButtonSet);
  } else {
    console.log(0);
  }
}

window.onload = isLogged; //Ao carregar a pagina, ela lanca a funcao

function logOutButtonSet() {
  sessionStorage.setItem("logged", false);
  sessionStorage.setItem("manager", false);
}
