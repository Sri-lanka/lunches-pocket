import { register } from "./global";


document.querySelector('#register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        "username": "test_username",
        "email": "test@example.com",
        "emailVisibility": true,
        "password": "12345678",
        "passwordConfirm": "12345678",
        "last_name": "test",
        "document": 123,
        "typeDocument": "CC",
        "telephone": 123,
        "state": true,
        "rol": "user"
    };

    let registerData = await register(data);
    if (!registerData) {
        alert("Error al registrar");
        return;
    }

    window.location.href = "login.html";
});