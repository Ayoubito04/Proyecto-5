import "./login.css";
import { loginFunction } from './loginFunction.js';


export const login=()=>{
    return `
<h1 class="Login">Registrate</h1>
<form id="loginForm">
  <input type="text" placeholder=" Nombre de usuario" id="name" required autocomplete="name"><br>
  <input type="email" placeholder="Email" id="email" required autocomplete="email"><br>
  <input type="password" placeholder="Contraseña" id="password" required autocomplete="current-password"><br>
  <button type="submit" id="submit">Enviar</button>
</form>


   
    `;



 
}

