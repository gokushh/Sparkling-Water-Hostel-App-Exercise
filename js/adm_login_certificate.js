const userLogin = document.querySelector(".userLogin");
const userPassword = document.querySelector(".userPassword");
const submitLogin = document.querySelector(".submitLogin");
const naoPermitido = document.querySelector(".naoPermitido");
// PRECISO TIRAR O AVISO DE SENHA ERRADA 

//Faz a verificacao de login e senha
function logIn() {
  if (userLogin.value === "CampoBelo") {
    if (userPassword.value === "1234") {
      //troca o valor de logged
      sessionStorage.setItem("logged", true);
      var logged = sessionStorage.getItem("logged");
      console.log(logged); //Mostra que logged e true
      //rediceriona a pagina para o link(e para estar com User e Log of)
      sessionStorage.setItem("manager", true); //Caso seja adm, mais uma opcao aparece no menu
      window.location.href = "../adm_manage_guest.html";
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
