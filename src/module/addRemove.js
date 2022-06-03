let todoList = [];
const form = document.querySelector('form');
const list = document.querySelector('#todo-list');


export const getDataFromStorage = () => {
  // getting existing data from localStorage
  let existingData = JSON.parse(localStorage.getItem('data'));
  if (existingData == null) existingData = todoList;

  // adding existingData to booksStore
  todoList = todoList.concat(existingData);

  // displaying data in the ui
  todoList.forEach((item) => {
    list.innerHTML += `
    <li class="list">
    <div>
    <input type="checkbox">
    <p contenteditable="true" class="todo-item" id="${item.index}">${item.description}</p>
    </div>
    <i class="bi bi-trash3 hide dot-${item.index}" id="${item.index}"></i>
    <i class="bi bi-three-dots-vertical trash-${item.index}"></i>
    </li>`;
  });
}

export const addItem = (e) => {
  e.preventDefault();
  const todo = document.querySelector('#todo');
  if(todo.value !== ''){
    const todoObj = {
      description: todo.value,
      completed: false,
      index: todoList.length + 1
    };

    todo.value = '';
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
  } 
};

export const handleClick = (e) => {
  let id = e.target.id;
  const dotIcon = document.querySelector(`.dot-${id}`);
  const trash = document.querySelector(`.trash-${id}`);

// set li background color

  document.querySelectorAll('.list').forEach(list => {
    list.classList.remove('yellow')
  })

  // toogle the trash icon

  document.querySelectorAll('.bi-trash3').forEach(list => {
    list.classList.add('hide')
  })

  document.querySelectorAll('.bi-three-dots-vertical').forEach(list => {
    list.classList.remove('hide')
  })

  if(e.target.classList.contains('todo-item')){
  e.target.parentElement.parentElement.classList.add('yellow');
  dotIcon.classList.toggle('hide')
  trash.classList.toggle('hide');
    e.target.addEventListener('input', () => {
      todoList[e.target.id - 1].description = e.target.textContent;
      localStorage.setItem('data', JSON.stringify(todoList));
    })
  }
  if(e.target.classList.contains('bi-trash3')){
    let idx = e.target.id;
    e.target.parentElement.remove();
    todoList.splice(idx - 1, 1);
    todoList = todoList.filter(item => item.index !== idx);
    todoList.map(function(element, i) { element.index = i + 1})
    list.innerHTML = '';
    todoList.forEach((item) => {
      list.innerHTML += `
      <li class="list">
      <div>
      <input type="checkbox">
      <p contenteditable="true" class="todo-item" id="${item.index}">${item.description}</p>
      </div>
      <i class="bi bi-trash3 hide dot-${item.index}" id="${item.index}"></i>
      <i class="bi bi-three-dots-vertical trash-${item.index}"></i>
      </li>`;
    });

    localStorage.setItem('data', JSON.stringify(todoList));
  }
}

list.addEventListener('click', handleClick);

form.addEventListener('submit', addItem);