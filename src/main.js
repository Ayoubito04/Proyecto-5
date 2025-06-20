import './style.css';

import {login} from './pages/login/login';
import { loginFunction } from './pages/login/loginFunction.js';


const header=()=>{
   

}
const main=()=>{
   const main=document.querySelector('main');
   main.innerHTML=login();
   loginFunction();
    
}
const footer=()=>{

}
main();
header();