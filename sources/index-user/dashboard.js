import { pb } from '../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "login.html";
        return;
    }
    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    console.log(user);
    document.querySelector('#user-info').innerHTML = `<p>Username: ${user.username}</p>`;
}

getUserInfo();

document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.href = "../../login.html";
});