import { list, todo } from './variables.js';

const todos = document.querySelectorAll('.todo-item');
todos.forEach((todo) => {
  todo.setAttribute('spellcheck', false);
});

let todoList = [];

const createHtml = (container, obj) => {
  container.innerHTML += `
  <li class="list">
  <div class="">
  <input type="checkbox" name="task" class="check check-${obj.index}" id="${obj.index}">
  <p contenteditable="true" class="todo-item item-${obj.index}" id="${obj.index}">${obj.description}</p>
  <i class="fa-regular fa-trash-can hide dot-${obj.index}" id="${obj.index}"></i>
  <i class="bi bi-three-dots-vertical trash-${obj.index}"></i>
  </div>
  </li>`;
};

const populate = (arr, path) => {
  path.innerHTML = '';

  arr.forEach((item) => {
    createHtml(path, item);
  });
};

const existingData = () => {
  let existingData = JSON.parse(localStorage.getItem('data'));
  if (existingData == null) existingData = todoList;

  todoList = todoList.concat(existingData);

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
    createHtml(list, item);
  }
};

const handleClick = (e) => {
  const { id } = e.target;
  const dotIcon = document.querySelector(`.dot-${id}`);
  const trash = document.querySelector(`.trash-${id}`);

  document.querySelectorAll('.list').forEach((list) => {
    list.classList.remove('yellow');
  });

  document.querySelectorAll('.fa-trash-can').forEach((list) => {
    list.classList.add('hide');
  });

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
  } else if (!e.target.classList.contains('todo-item')) {
    const list = document.querySelectorAll('.list');
    list.forEach((list) => {
      list.classList.remove('yellow');
    });
  }

  if (e.target.classList.contains('fa-trash-can')) {
    const idx = e.target.id;
    e.target.parentElement.remove();
    todoList.splice(idx - 1, 1);
    todoList = todoList.filter((item) => item.index !== idx);
    todoList.map((element, i) => {
      element.index = i + 1;
      return element;
    });

    list.innerHTML = '';

    populate(todoList, list);
    localStorage.setItem('data', JSON.stringify(todoList));
  }

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

const filterItems = () => {
  todoList = todoList.filter((item) => item.completed === false);
  todoList.map((element, i) => {
    element.index = i + 1;
    return element;
  });

  list.innerHTML = '';

  populate(todoList, list);
  localStorage.setItem('data', JSON.stringify(todoList));
};

export {
  existingData, addItem, handleClick, filterItems,
};
