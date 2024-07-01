import { pb } from '../../../global.js';
async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);

    document.querySelector('#update-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            "username": "test_username_update",
            "emailVisibility": false,
            "last_name": "test_update",
            "document": 123,
            "typeDocument": "ti",
            "telephone": 12345,
            "rol": "user",
            "state": "active"
        };
        const record = await pb.collection('users').update( user.id , data);

        let update = await update(data);
        if (!update) {
            alert("Error al registrar");
            return;
        }
    
        window.location.href = "data";
    })


    /*document.querySelector('#register-form').addEventListener('submit', async (e) => {
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
    })*/
}

getUserInfo();