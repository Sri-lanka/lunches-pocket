import { logIn } from './global.js';

document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let data = await logIn(email, password);
    if (!data) {
        alert("failed to login");
        return;
    }

    window.location.href = "/src/user/home";
});