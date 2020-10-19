var fullTable; //Servir pra passar o array da mesa
var fullTableN; //Vai passar o tamanho da mesa


// 1 - PARA INICIAR, CRIAMOS UMA CLASSE PARA A PAGINACAO. Peguei um tutorial de um indiano mega interessante
class Pagination {
  // 1.1 - options vai passar esses parametros para o controle da paginacao: {id:'pagination(botões de paginação)', tableID:'datatable(dados dos hospedes)', noOfRows:10(numero de linhas por pagina)}
  constructor(options) {
    console.log(options); //Imprime no console {id:'pagination', tableID:'datatable', noOfRows:10}
    this.id = options.id; //Captamos o ID da area de paginacao 'pagination'
    this.element = document.getElementById(this.id); //Para poder acessar ela e modificar

    this.tableID = options.tableID; //Recebe 'datatable' para podemos captar:
    console.log('table body 0');
    this.tableBody = document.querySelector("#" + this.tableID + " tbody"); // (#datatable tbody) = parte da tabela em que estao os dados de usuarios
    console.log(this.tableBody);
    this.tableElement = document.getElementById(this.tableID); //Capta o elemento datatable no DOM, que é a tabela inteira

    this.nextButton = this.element.getElementsByClassName("next")[0]; //Seleciona o botao proximo
    this.prevButton = this.element.getElementsByClassName("previous")[0]; //Seleciona o botao anterior
    this.paginationLabel = this.element.getElementsByClassName("pagination-label")[0]; //Rotulo de informação sobre em qual pagina estamos, etc
    this.noOfRows = options.noOfRows; //Numero de linhas por pagina

    this.start = 1; //Ambos servem como Indice dos elementos a serem inseridos numa pagina, ex: el[11] até o el[20]
    this.end = this.noOfRows; //Ele pega o numero de linhas pra assegurar a exibição caso não passe de uma pagina
    this.init(); //1.1 - Chama a funcao para inicializar a tabela
  }

  init() {
    this.collectingTableInfo(); //2 - Primeiro, coletamos os dados da tabela para exibirmos de acordo.
    this.addEvents(); //4 - Por fim, adcionamos eventListeners para os botoes de anterior e proximo
  }
  //----------------------------- 2
  //Armazena os dados de usuarios em uma lista, pega o tamanho da lista, e distribui a quantia pela pagina
  collectingTableInfo() {
    // !!!!!!!!!!!!!!!!!!!!!!!!!
    this.totalRows = document.querySelectorAll("#" + this.tableID + " tbody tr"); //Vai retornar uma lista de todos os elementos 'tr' presentes em '#tabledata tbody tr'
    this.totalNoOfRows = this.totalRows.length; //Armazena o tamanho dessa lista
    //Pegamos essa lista e o tamanho e armazenamos em vars globais
    fullTable = this.totalRows;
    fullTableN = this.totalNoOfRows;
    //!!!!!!!!!!!!!!!!!!!!!!!!!!

    console.log(`Numero total de linhas ${this.totalNoOfRows}`); //Mostra o total de hospedes inseridos


    if (this.totalNoOfRows <= this.noOfRows) {
      //Se o total de linhas(hospedes) for menor ou igual ao numero de linhas permitido(10)
      this.element.style.display = "none"; //Nao vai aparecer a area de paginação
    } else {
      this.showRows(this.totalRows, this.start, this.end); //2.1 - Senao, chama a função para exibir a paginação, passando apenas possíveis índices de elementos para serem exibidos
    }
  }
  //----------------------------- 4

  addEvents() {
    this.nextButton.addEventListener("click", () => this.onNext());
    this.prevButton.addEventListener("click", () => this.onPrevious());
  }

  //-----------------------------
  // BOTAO NEXT
  onNext() {
    console.log("Next Button Clicked");
    this.start = this.end + 1;
    this.end = this.start + this.noOfRows - 1;

    if (this.end >= this.totalNoOfRows) {
      this.end = this.totalNoOfRows;
    }
    this.showRows(this.totalRows, this.start, this.end);
  }

  // BOTAO PREVIOUS
  onPrevious() {
    console.log("Previous Button Clicked");
    if (this.start > 1) {
      this.start = this.start - this.noOfRows;
      this.end = this.start + this.noOfRows - 1;
    }

    this.showRows(this.totalRows, this.start, this.end);
  }

  //----------------------------- 2.1
  showRows(rows, start, end) {
    console.log('rows')
    console.log(rows);
    start = start - 1; //start = 0
    end = end - 1; // end = noOfRows - 1

    this.tableBody.innerHTML = ""; //Limpamos os dados da tabela

    for (let i = 0; i < rows.length; i++) {
      //Enquando i for menor que a quantidade de elementos

      if (i >= start && i <= end) {
        //Percorre a tabela e escreve os elementos que estao entre o start e end
        this.tableBody.appendChild(rows[i]);
      }
    }

    this.updatePagination(); //2.2 - Por fim chama uma função para atualizar a area de paginação
  }

  //----------------------------- 2.2

  updatePagination() {
    if (this.end == this.totalNoOfRows) {
      //Se o item final da lista for o ultimo
      this.nextButton.style.display = "none"; //Escondemos o botão 'próximo'
    } else {
      this.nextButton.style.display = "block"; //Senao, Mostramos
    }

    if (this.start == 1) {
      //Assim como se o primeiro item for o primeiro elemento da lista, não haverá página anterior
      this.prevButton.style.display = "none";
    } else {
      this.prevButton.style.display = "block";
    }

    //Por fim, atualiza o rotulo da paginação. daqui volta para init()
    this.paginationLabel.innerHTML = "Viewing <span>" + this.start + "-" + this.end + "</span> of <span>" + this.totalNoOfRows + "</span>";
  }

//---------------------------------------------------------------------------

  searchOnList() {
    var input = document.getElementById("searchInput"); //Capta o input
    var filter = input.value.toUpperCase(); //Jogamos tudo para fonte maiuscula para que possa ser procurado sem o Case Sensitive atrapalhar
    var textValue; 

    console.log(-20);
    console.log(this.totalRows);  //lista de dados dos hospedes
    console.log(this.totalNoOfRows); //quantidade de linhas
    //Limpamos os dados da tabela
    this.tableBody.innerHTML = "";

    //se o filtro do input estiver vazio a gente volta ele ao estado inicial
    if(filter !== ''){
      //Percorrer a lista
      for (let i = 0; i < this.totalRows.length; i++) {
        textValue = this.totalRows[i].textContent || this.totalRows[i].innerText;
        //verifica se o conteudo da pesquisa foi encontrado
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          this.tableBody.appendChild(this.totalRows[i]); //insere a linha que tem a informação que bateu
        }
        
      }

    }else{
      console.log('arrumando...');
      this.showRows(this.totalRows, this.start, this.end);
    }
      
  }

  


}