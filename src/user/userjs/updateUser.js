import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);


}

getUserInfo();