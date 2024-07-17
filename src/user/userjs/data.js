import { pb } from '../../../global.js';
let overlayUpdate = document.getElementById('overlay-update');
async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "data.html";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);
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


    let dataUserUp = document.querySelector('#dataUp');
    dataUserUp.innerHTML = '<td> ' + listData.username + '</td>';
    dataUserUp.innerHTML += '<td> ' + listData.last_name + '</td>';
    dataUserUp.innerHTML += '<td> ' + listData.document + '</td>'; ''

    let dataUserDown = document.querySelector('#dataDown');
    dataUserDown.innerHTML = '<td> ' + listData.telephone + '</td>';
    dataUserDown.innerHTML += '<td> ' + listData.email + '</td>';
    let userUpdateBtn = document.createElement('a');
    userUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
    userUpdateBtn.onclick = () => {
        alert("Me pica la monda...");
    }

    let userUpdateTd = document.createElement('td');
    userUpdateTd.appendChild(userUpdateBtn);
    dataUserDown.appendChild(userUpdateTd);

    async function updateUser(id, email, telephone) {
        let result = await pb.collection('users').update(id, {
            id: id,
            email: email,
            telephone: telephone,
        });
        console.log(result);
    }

    let updateBtn = document.getElementById('updateUser')
    updateBtn.onclick = async () => {
        overlayUpdate.style.display = 'block';

        let updateFormBtn = document.getElementById('update-form-btn');
        updateFormBtn.onclick = async (event) => {
            event.preventDefault();
            let email = document.getElementById('email');
            let telephone = document.getElementById('telephone');

            console.log(email.value);
            console.log(telephone.value);
            await updateUser(user.id, email.value, telephone.value);
            window.location.reload();

        }
    }
}

getUserInfo();


document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.replace("../../../index");
});
document.querySelector('#home-btn').addEventListener('click', async () => {
    window.location.href = "home";
});
document.querySelector('#data-btn').addEventListener('click', async () => {
    window.location.href = "data";
});
document.querySelector('#history-btn').addEventListener('click', async () => {
    window.location.href = "history";
});
