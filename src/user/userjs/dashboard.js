import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "home.html";
        return;
    }
    
    let user = await pb.collection('users').getOne(pb.authStore.model.id);
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
    let listData = result.items[0];
    console.log(listData);
    let userSheetElement = document.querySelector('#user-info');
    userSheetElement.innerHTML = '<li> ' + listData.username + '</li>';
    userSheetElement.innerHTML += '<li> ' + listData.last_name + '</li>';
    userSheetElement.innerHTML += '<li>Sheet: ' + listData.N_sheet + '</li>';
    userSheetElement.innerHTML += '<li>state: ' + listData.state + '</li>';
}

getUserInfo();

document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.href = "../../../index";
});