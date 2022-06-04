import { todoList } from './addRemove.js';

const checkboxes = document.querySelectorAll('input[name="task"]');

const setItem = (e) => {
  const { id } = e.target;
  const p = document.querySelector(`.item-${id}`);
  p.classList.toggle('line');
  if (!todoList[id - 1].completed) {
    todoList[id - 1].completed = true;
  } else {
    todoList[id - 1].completed = false;
  }
  localStorage.setItem('data', JSON.stringify(todoList));
};

checkboxes.forEach((item) => { item.addEventListener('change', setItem); });
export default setItem;