import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
    let user = await pb.collection('users').getOne(pb.authStore.model.id);

    async function updateUser(id, email, telephone) {
        let result = await pb.collection('users').update(id, email, telephone, {
            email: email,
            telephone: telephone,
        });
        console.log(result);
    }
    

    let updateFormBtn = document.getElementById('update-form-btn');
    updateFormBtn.onclick = async (event) => {
        event.preventDefault();
        let email = document.getElementById('email');

        let telephone = document.getElementById('telephone')

        await updateUser(user.id, user.email, user.telephone);
        window.location.href = "data";
    }


}/*   let updateTd = document.createElement('td');
let updateBtn = document.createElement('button');
updateBtn.innerHTML = 'Update';

updateBtn.onclick = async () => {
    overlayUpdate.style.display = 'block';

    let updateFormBtn = document.getElementById('update-form-btn');
    updateFormBtn.addEventListener = "sumbit", async (event) => {
        event.preventDefault();
        await updateUser(listUser.id, listUser.email, listUser.telephone);
        window.location.reload();
    }
}
updateTd.appendChild(updateBtn);
newRow.appendChild(updateTd);*/
/*

    async function onCreatUser() {
        overlayCreate.style.display = 'block';
        let username = document.getElementById('username');
        let last_name = document.getElementById('last_name');
        let document = document.getElementById('document');
        let typeDocument = document.getElementById('typeDocument');
        let email = document.getElementById('email');
        let telephone = document.getElementById('telephone');
        let state = document.getElementById('state');
        let rol = document.getElementById('rol');
        let password = document.getElementById('password');
        let createForm = document.getElementById('create-form');

        createForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            let formData = new FormData(createForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });
            console.log(data);

            await createUsers(data.username.value, data.last_name.value, data.email.value, data.telphone.value, data.state.value, data.rol.value, data.password.value);
            window.location.reload();
        });
    }

*/
getUserInfo();