let todoList = [];
const form = document.querySelector('form');
const list = document.querySelector('#todo-list');

export const addItem = (e) => {
  e.preventDefault();
  const todo = document.querySelector('#todo').value;
  const todoObj = {
    description: todo,
    completed: false,
    index: todoList.length + 1
  };
  todoList.push(todoObj);
  localStorage.setItem('data', JSON.stringify(todoList));
    let item = todoList[todoList.length -1]
    list.innerHTML += `
    <li class="list">
    <div>
    <input type="checkbox">
    <p contenteditable="true" class="todo-item" id="${item.index}">${item.description}</p>
    </div>
    <i class="bi bi-trash3 hide dot-${item.index}" id="${item.index}"></i>
    <i class="bi bi-three-dots-vertical trash-${item.index}"></i>
    </li>`;
};

form.addEventListener('submit', addItem);