import './style.css';
import { getDataFromStorage } from '../modules/addRemove';
import { addItem } from '../modules/addRemove';
import { handleClick } from '../modules/addRemove';


getDataFromStorage();
addItem();
handleClick();