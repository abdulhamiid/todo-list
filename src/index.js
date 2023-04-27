import { form, clear } from './modules/variables.js';
import {
  existingData, addItem, handleClick, filterItems,
} from './modules/code.js';
import './style.css';

existingData();
form.addEventListener('submit', addItem);
document.body.addEventListener('click', handleClick);
clear.addEventListener('click', filterItems);