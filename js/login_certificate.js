const userLogin = document.querySelector(".userLogin");
const userPassword = document.querySelector(".userPassword");
const submitLogin = document.querySelector(".submitLogin");
const naoPermitido = document.querySelector(".naoPermitido");

//Faz a verificacao de login e senha
function logIn() {
  if (userLogin.value === "CampoBelo") {
    if (userPassword.value === "1234") {
      //troca o valor de logged
      sessionStorage.setItem("logged", true);
      var logged = sessionStorage.getItem("logged");
      console.log(logged); //Mostra que logged e true
      //rediceriona a pagina para o link(e para estar com User e Log of)
      window.location.href = "../reservation.html";
    } else {
      naoPermitido.textContent = "Incorrect password";
    }
  }else{
      naoPermitido.textContent = "Incorrect email";
  }

  userLogin.value = "";
  userPassword.value = "";
  userLogin.focus();

  //Apresenta valor null
  // var logged = sessionStorage.getItem('logged');
  // console.log(logged);
}

submitLogin.addEventListener("click", logIn);
