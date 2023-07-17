const forms = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach(element => {
    criarItem(element)
});

forms.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];

  const existe = itens.find(element=>element.nome===nome.value)

  const itemAtual = {
    "nome": nome.value,
    "quantidade":quantidade.value
  }

    if(existe){
        itemAtual.id = existe.id

        atualizaItem(itemAtual)

        itens[itens.findIndex(elemento=>elemento.id===existe.id)] = itemAtual
    }
    else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id+1:0;

        criarItem(itemAtual);

        itens.push(itemAtual)
    }
    

    localStorage.setItem("itens", JSON.stringify(itens))
 
    nome.value = ""
    quantidade.value = ""
});

function criarItem(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeletar(item.id))

  lista.appendChild(novoItem);


}
function atualizaItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML=item.quantidade
}

function botaoDeletar(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaItem(this.parentNode,id)
        
    })

    return elementoBotao
}
function deletaItem(tag,id){
    tag.remove()
    itens.splice(itens.findIndex(elemento=>elemento.id===id),1)
    localStorage.setItem("itens", JSON.stringify(itens))
}