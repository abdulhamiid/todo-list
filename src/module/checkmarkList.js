import { todoList } from "./addRemove";
const checkboxes = document.querySelectorAll('input[name="task"]');
const clear = document.querySelector('#clear');

export const setItem = (e) => {
  let id = e.target.id;
  let p = document.querySelector(`.item-${id}`);
  p.classList.toggle('line');
  if(!todoList[id - 1].completed){
    todoList[id - 1].completed = true;
  }else {
    todoList[id - 1].completed = false
; }
  localStorage.setItem('data', JSON.stringify(todoList));
}

checkboxes.forEach(item => {item.addEventListener('change', setItem)})