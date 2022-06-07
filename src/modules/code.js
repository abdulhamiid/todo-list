import { list, todo } from './variables.js';

let todoList = [];

const populate = (arr, path) => {
  // set list to none
  path.innerHTML = '';

  // update list
  arr.forEach((item) => {
    path.innerHTML += `
    <li class="list">
    <div>
    <input type="checkbox" name="task" class="check check-${item.index}" id="${item.index}">
    <p contenteditable="true" class="todo-item item-${item.index}" id="${item.index}">${item.description}</p>
    </div>
    <i class="bi bi-trash3 hide dot-${item.index}" id="${item.index}"></i>
    <i class="bi bi-three-dots-vertical trash-${item.index}"></i>
    </li>`;
  });
};

const existingData = () => {
  // getting existing data from localStorage
  let existingData = JSON.parse(localStorage.getItem('data'));
  if (existingData == null) existingData = todoList;

  // adding existingData to todoList
  todoList = todoList.concat(existingData);

  // displaying data in the ui
  populate(todoList, list);
};

const addItem = (e) => {
  e.preventDefault();
  if (todo.value !== '') {
    const todoObj = {
      description: todo.value,
      completed: false,
      index: todoList.length + 1,
    };

    todo.value = '';
    todoList.push(todoObj);
    localStorage.setItem('data', JSON.stringify(todoList));
    const item = todoList[todoList.length - 1];
    list.innerHTML += `
      <li class="list">
      <div>
      <input type="checkbox" name="task" class="check check-${item.index}" id="${item.index}">
      <p contenteditable="true" class="todo-item item-${item.index}" id="${item.index}">${item.description}</p>
      </div>
      <i class="bi bi-trash3 hide dot-${item.index}" id="${item.index}"></i>
      <i class="bi bi-three-dots-vertical trash-${item.index}"></i>
      </li>`;
  }
};

const handleClick = (e) => {
  const { id } = e.target;
  const dotIcon = document.querySelector(`.dot-${id}`);
  const trash = document.querySelector(`.trash-${id}`);

  // set li background color
  document.querySelectorAll('.list').forEach((list) => {
    list.classList.remove('yellow');
  });

  // toogle the trash icon
  document.querySelectorAll('.bi-trash3').forEach((list) => {
    list.classList.add('hide');
  });

  // toogle the dot icon
  document.querySelectorAll('.bi-three-dots-vertical').forEach((list) => {
    list.classList.remove('hide');
  });

  if (e.target.classList.contains('todo-item')) {
    e.target.parentElement.parentElement.classList.add('yellow');
    dotIcon.classList.toggle('hide');
    trash.classList.toggle('hide');
    e.target.addEventListener('input', () => {
      todoList[e.target.id - 1].description = e.target.textContent;
      localStorage.setItem('data', JSON.stringify(todoList));
    });
  }

  // item deletion event
  if (e.target.classList.contains('bi-trash3')) {
    const idx = e.target.id;
    e.target.parentElement.remove();
    todoList.splice(idx - 1, 1);
    todoList = todoList.filter((item) => item.index !== idx);
    todoList.map((element, i) => {
      element.index = i + 1;
      return element;
    });

    // set list to none
    list.innerHTML = '';

    // update list
    populate(todoList, list);
    localStorage.setItem('data', JSON.stringify(todoList));
  }

  // checkbox event
  if (e.target.classList.contains('check')) {
    const { id } = e.target;
    const p = document.querySelector(`.item-${id}`);
    const checkbox = e.target;
    if (checkbox.checked) {
      todoList[id - 1].completed = true;
      p.classList.add('line');
      localStorage.setItem('data', JSON.stringify(todoList));
    } else if (!checkbox.checked) {
      todoList[id - 1].completed = false;
      p.classList.remove('line');
      localStorage.setItem('data', JSON.stringify(todoList));
    }
  }
};

// filter all completed items in the list
const filterItems = () => {
  todoList = todoList.filter((item) => item.completed === false);
  todoList.map((element, i) => {
    element.index = i + 1;
    return element;
  });

  // set list to none
  list.innerHTML = '';

  // update list
  populate(todoList, list);
  localStorage.setItem('data', JSON.stringify(todoList));
};

export {
  existingData, addItem, handleClick, filterItems,
};