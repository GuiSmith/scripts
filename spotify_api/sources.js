function setContent(elementId, attribute, value){
  const element = document.getElementById(elementId);
  if(attribute == "text"){
    element.textContent = value;
  }else{
    element.setAttribute(attribute,value);
  }
}
function showElement(tag,elementId, parentId = "body", text = ""){
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