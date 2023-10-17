fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
.then(data => data.json())
    .then(states => {
    //Exibicação de dados com repetição e sem filtros (estados gerais)
  states.forEach(function(state){
    showOption(state.nome, state.sigla,"state-input");
  });
  const currentState = document.getElementById("state-input");
  currentState.addEventListener("click",function(){
    const cities = document.querySelectorAll("#city-input > *");
    cities.forEach(function(city){
      city.remove();
    });
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${currentState.value}/municipios`)
    .then(data => data.json())
        .then(cities => {
        //Exibição de dados com repetição e com filtro (municípios de um estado)
      cities.forEach(function(city){
        showOption(city.nome,city.nome,"city-input");
      });
    });
  });
});

//Dica de Estado
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/35")
    .then(data => data.json())
    .then(state => {
        //Exibição de dados sem repetição e com filtro (estado de São Paulo)
        document.querySelector('#state-tip').textContent = state.nome;
});

//Dica de cidade
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios/3534401")
    .then(data => data.json())
    .then(city => {
        //Exibição de dados sem repetição e com filtro (cidade de Osasco)
        document.querySelector('#city-tip').textContent = city.nome;
    });


function showOption(text, value, parentId){
  const parent = document.getElementById(parentId);
  const element = document.createElement("option");
  element.textContent = text;
  element.value = value;
  parent.appendChild(element);
}