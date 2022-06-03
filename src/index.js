import './style.css';
import { getDataFromStorage } from './module/addRemove';
import { addItem } from './module/addRemove';
import { handleClick } from './module/addRemove';


getDataFromStorage();
addItem();
handleClick();