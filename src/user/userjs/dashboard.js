import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "home.html";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);


    console.log(user.username);

    const result = await pb.collection('sheet_user').getList(1, 50, {
        filter: `username = "${user.username}"`,
    });

    let listData = result.items[0];
    //console.log(listData);
    let userSheetElement = document.querySelector('#user-info');
    userSheetElement.innerHTML = '<li> ' + listData.username + '</li>';
    userSheetElement.innerHTML += '<li> ' + listData.last_name + '</li>';
    userSheetElement.innerHTML += '<li>Sheet: ' + listData.N_sheet + '</li>';
    userSheetElement.innerHTML += '<li>state: ' + listData.state + '</li>';


    const resultOutbox = await pb.collection('message_user').getList(1, 50, {
        filter: `sender = "${user.username}"`,
    });


    for (let i = 0; i < resultOutbox.items.length; i++) {
        let listOutbox = resultOutbox.items[i];
        console.log(listOutbox);

        let newRow = document.createElement('tr');

        let senderCell = document.createElement('td');
        senderCell.textContent = listOutbox.sender;
        newRow.appendChild(senderCell);

        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = listOutbox.description;
        newRow.appendChild(descriptionCell);

        document.querySelector('#messageOutbox').appendChild(newRow);
    }


    const resultInbox = await pb.collection('message_user_report').getList(1, 50, {
        filter: `Recipient = "${user.id}"`,
    });

    console.log(resultInbox);

    for (let i = 0; i < resultInbox.items.length; i++) {
        let listInbox = resultInbox.items[i];


        let newRow = document.createElement('tr');

        let senderCell = document.createElement('td');
        senderCell.textContent = listInbox.sender;
        newRow.appendChild(senderCell);

        let descriptionCell = document.createElement('td');
        descriptionCell.textContent = listInbox.description;
        newRow.appendChild(descriptionCell);

        document.querySelector('#messageInbox').appendChild(newRow);
    }

    async function createMessage(id, idUser, type_message = "excuse", description, field, Recipient) {
        let result = await pb.collection('assistance').create({
            idUser: id,
            type_message: type_message,
            description: description,
            field: field,
            Recipient: Recipient,
        });

        console.log(result);
    }

    async function onCreateMessage() {





        console.log(data);

        await createMessage(id.value, idUser.value, type_message.value, description.value, field.value, Recipient.value);
        window.location.reload();

    }
}
    getUserInfo();

    let createBtn = document.getElementById('send-btn');
    createBtn.onclick = async () => {
        await onCreateAssistance();
    }

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