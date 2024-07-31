import { pb } from '../../../global.js';

async function isValid() {
    if (!pb.authStore.isValid) {
        window.location.href = "../../../login";
        return;
        
    }
  
    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (user.rol != 'admin') {
      window.location.href = "home";
      return false;
    }
}
  
isValid();

async function getUserInfo(){
    let userData = await pb.collection('users').getOne(pb.authStore.model.id);

    let userInfo = document.querySelector('#user-info');
    userInfo.innerHTML = '<li> ' + userData.name + '</li>';
    userInfo.innerHTML += '<li> ' + userData.last_name + '</li>';
    userInfo.innerHTML += '<li> ' + userData.email + '</li>';

    
    const resultInbox = await pb.collection('message_administrators').getList(1, 50, {
        sort: '-created',
    });

    for (let i = 0; i < resultInbox.items.length; i++) {
        let listInbox = resultInbox.items[i];
        let newRow = document.createElement('tr');

        let senderCell = document.createElement('td');
        senderCell.textContent = listInbox.sender;
        newRow.appendChild(senderCell);

        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = listInbox.description;
        newRow.appendChild(descriptionCell);

        let showTd = document.createElement('td');
        let showBtn = document.createElement('a');
        showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
        showTd.appendChild(showBtn);
        newRow.appendChild(showTd);

        document.querySelector('#messageInbox').appendChild(newRow);
    }

}
getUserInfo();

document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.replace("../../../login.html");
});

document.querySelector('#home-btn').addEventListener('click', async () => {
    window.location.href = "administratorHome";
});

document.querySelector('#data-btn').addEventListener('click', async () => {
    window.location.href = "messengerService";
});

document.querySelector('#module-btn').addEventListener('click', async () => {
    window.location.href = "users";
});