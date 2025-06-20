

export const loginFunction = () => {
    const form= document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
       
        
        if(name=="" && email=="" && password==""){
            alert('Por favor, completa todos los campos');
        }
        else if(!email.includes('@')){
          alert('Por favor, ingresa un email válido');
        }
        else if(password.length<6){
           alert('La contraseña debe tener al menos 6 caracteres');
        }
         localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        const NombreGuardado = localStorage.getItem('name');
        const EmailGuardado = localStorage.getItem('email');
        const PasswordGuardado = localStorage.getItem('password');

        const user = {
            name: NombreGuardado,
            email: EmailGuardado,
            password: PasswordGuardado
        }
        console.log(user);
        alert('Bienvenido ' + user.name);
        window.location.href ='src/pages/tienda/tienda.html';

    

        
     
    

})
}
