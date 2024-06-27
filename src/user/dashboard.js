import { pb } from '../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "home.html";
        return;
    }
    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    console.log(user);
    /*
    let userinfo = document.querySelector('#user-info');
    userinfo.innerHTML = '<li>Nombre: ' + user.username + '</li>';
    userinfo.innerHTML += '<li>Documento: ' + user.document + '</li>';
    userinfo.innerHTML += '<li>sheet: '+ user.sheet + '</li>';
    userinfo.innerHTML += '<li>Estado: ' + user.state + '</li>';*/
    console.log(user.username);
    const result = await pb.collection('sheet_user').getList(1, 50, {
        filter: `username = "${user.username}"`,
    });
    console.log(result);
    /*let userSheetElement = document.querySelector('#user-info');
    userSheetElement.innerHTML = '<li>Nombre: ' + result.username + '</li>';
    userSheetElement.innerHTML += '<li>Sheet: ' + result.N_sheet + '</li>';*/

}

getUserInfo();

document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.href = "../../index";
});