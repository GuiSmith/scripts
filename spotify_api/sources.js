//Sets content using getElementById
export function setContent(elementId, attribute, value, query = false){
  let element;
  if(query){
    element = document.querySelector(elementId);
  }else{
    element = document.querySelector(`#${elementId}`);
  }
  if(attribute == "text"){
    element.textContent = value;
  }else{
    element.setAttribute(attribute,value);
  }
}

//Filters text and returns simple text until feat, minus and parenthesis
export function filterText(text){
  let filtered = text.toLowerCase().split(/[-()]+|feat|ft/i)[0].trim();
  return filtered.charAt(0).toUpperCase() + filtered.slice(1);
}
export function mobileDesktop(value1, value2){
  if(window.screen.availWidth <= 600){
    return value1;
  }else{
    return value2;
  }
}

//Gets an array of artist objects and returns a string to be displayed
export function getArtists(array){
  let artists = "";
  
  for(var i=0;i<array.length;i++){
    switch(i){
      case (array.length-1):
        artists += `${array[i].name}`;
        break;
      case (array.length-2):
        artists += `${array[i].name} e `;
        break;
      default:
        artists += `${array[i].name}, `
    }
  }
  return artists;
}