fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
.then(data => data.json())
.then(states => {
  states.forEach(function(state){
    showOption(state.nome, state.sigla,"state-input");
  });
  const currentState = document.getElementById("state-input");
  currentState.addEventListener("click",function(){
    const cities = document.querySelectorAll("#city-input > *");
    cities.forEach(function(city){
      city.remove();
    });
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`)
    .then(data => data.json())
    .then(cities => {
      cities.forEach(function(city){
        if(city.microrregiao.mesorregiao.UF.sigla == currentState.value){
          showOption(city.nome,city.nome,"city-input");
        }
      });
      // console.log(cidades[0].microrregiao.mesorregiao.UF.sigla);
    });
  });
});

function showOption(text, value, parentId){
  const parent = document.getElementById(parentId);
  const element = document.createElement("option");
  element.textContent = text;
  element.value = value;
  parent.appendChild(element);
}

const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click',function(){
  const name = returnValue('name-input');
  const email = returnValue('email-input');
  const state = returnValue('state-input');
  const city = returnValue('city-input');

});

function returnValue(elementId){
  const element = document.querySelector(`#${elementId}`);
  return element.value;
}