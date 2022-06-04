import './style.css';
import {
  getDataFromStorage, addItem, handleClick, filterTodo,
} from './module/checkmarkList.js';

addItem();
handleClick();
filterTodo();
getDataFromStorage();