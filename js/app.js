// JS da navbar e página principal

const nav=document.getElementsByTagName("nav")[0];
const topoNav=nav.offsetTop; //retorna a medida em pixels da distancia do elemento em relação ao topo

window.onscroll=function(){
    fixarMenuNoTopo();
}

function fixarMenuNoTopo(){
    if(window.pageYOffset >= topoNav){ //se o documento estiver no topo, ele vai retornar a posição 0
        nav.classList.add("FixoNoTopo");
    }else{
        nav.classList.remove("FixoNoTopo");
    }
}

// JS da tela de login

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


