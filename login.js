import { logIn } from './global.js';

document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let data = await logIn(email, password);
    if (!data) {
        alert("Error al iniciar sesión");
        return;
    }

    window.location.href = "/sources/index-user/index";
});