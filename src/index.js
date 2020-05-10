import {CheckCardNumber} from "./card";
import './styles/main.scss'


const form = document.querySelector('form');
const checkCardNumber = new CheckCardNumber()
form.addEventListener('submit',(e)=>checkCardNumber.showInfo(e) )