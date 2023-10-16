export function setContent(elementId, attribute, value){
  const element = document.getElementById(elementId);
  if(attribute == "text"){
    element.textContent = value;
  }else{
    element.setAttribute(attribute,value);
  }
}
export function showElement(tag,elementId, parentId = "body", text = ""){
  let parent;
  if(parentId == "body"){
    parent = document.body;
  }else{
    parent = document.getElementById(parentId);
  }
  const element = document.createElement(tag);
  element.id = elementId;
  element.textContent = text;
  parent.appendChild(element);
}
export function filterText(text){
  return text.toLowerCase().split(/[-()]+/)[0].trim();
}
export function mobileDesktop(value1, value2){
  if(window.screen.availWidth <= 600){
    return value1;
  }else{
    return value2;
  }
}