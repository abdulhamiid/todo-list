import './style.css';

const todoList = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'Wash the car',
    completed: false,
    index: 2,
  },
  {
    description: 'Completed todo list project',
    completed: false,
    index: 3,
  },
];

const list = document.querySelector('#todo-list');

const addItem = () => {
  todoList.forEach((item) => {
    list.innerHTML += `
    <li>
    <div>
    <input type="checkbox">
    <p>${item.description}</p>
    </div>
    <i class="bi bi-three-dots-vertical"></i>
    </li>`;
  });
};

addItem();