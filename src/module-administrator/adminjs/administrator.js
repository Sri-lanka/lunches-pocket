import { pb, formatDate } from '../../../global.js';
async function isValid() {

    if (!pb.authStore.isValid) {
        window.location.href = "../../../login";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (user.rol != 'admin') {
        window.location.href = "../user/home";
        return;
    }
}


await isValid();

let overlayShowMessage = document.getElementById('overlay-show-message');
async function getUserInfo() {



    let userData = await pb.collection('users').getOne(pb.authStore.model.id);

    let userInfo = document.querySelector('#user-info');
    userInfo.innerHTML = '<li> ' + userData.name + '</li>';
    userInfo.innerHTML += '<li> ' + userData.last_name + '</li>';
    userInfo.innerHTML += '<li> ' + userData.email + '</li>';


    const resultInbox = await pb.collection('message_administrators').getList(1, 50, {
        sort: '-created',
        expand: 'Recipient, idUser',
    });

    for (let i = 0; i < resultInbox.items.length; i++) {
        let listInbox = resultInbox.items[i];
        let newRow = document.createElement('tr');



        let senderCell = document.createElement('td');
        senderCell.setAttribute("colspan", "2");
        senderCell.textContent = listInbox.sender;
        newRow.appendChild(senderCell);

        let descriptionCell = document.createElement('td');
        descriptionCell.setAttribute("colspan", "2");
        descriptionCell.textContent = listInbox.description;
        newRow.appendChild(descriptionCell);

        let showTd = document.createElement('td');
        let showBtn = document.createElement('a');
        showBtn.innerHTML = '<img src="/img/eye.png" class="icon a-button">';
        showTd.appendChild(showBtn);
        newRow.appendChild(showTd);
        showBtn.addEventListener('click', async () => {
            const cardContainer = document.getElementById('cardContainer');

            cardContainer.innerHTML = '';

            const card = document.createElement('div');
            card.className = 'card';

            const senderElement = document.createElement('h3');
            senderElement.textContent = listInbox.expand.idUser.email;
            card.appendChild(senderElement);

            const div = document.createElement('hr');
            card.appendChild(div);

            const typeMessageElement = document.createElement('p');
            typeMessageElement.textContent = "Message";
            card.appendChild(typeMessageElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'description';
            descriptionElement.textContent = listInbox.description;
            card.appendChild(descriptionElement);

            const div1 = document.createElement('hr');
            card.appendChild(div1)

            if (listInbox.field) {
                const nameFile = document.createElement('p');
                nameFile.textContent = listInbox.field;
                card.appendChild(nameFile);
                const attachmentElement = document.createElement('a');
                attachmentElement.className = 'attachment';
                attachmentElement.href = `${pb.baseUrl}/api/files/${listInbox.collectionId}/${listInbox.id}/${listInbox.field}`;
                attachmentElement.textContent = 'show file';
                attachmentElement.target = '_blank';
                card.appendChild(attachmentElement);
            } else {
                const attachmentElement = document.createElement('p');
                attachmentElement.textContent = 'NO FILE ATTACHED';
                card.appendChild(attachmentElement);
            }

            const div2 = document.createElement('hr');
            card.appendChild(div2);


            const RecipientElement = document.createElement('p');
            RecipientElement.textContent = "Recipient : All administrators";
            card.appendChild(RecipientElement);

            const createdElement = document.createElement('p');
            const createdFormat = await formatDate(listInbox.created);

            createdElement.innerHTML += createdFormat;
            card.appendChild(createdElement);



            const closeElement = document.createElement('button');
            closeElement.innerHTML = 'close';
            closeElement.onclick = () => {
                overlayShowMessage.style.display = 'none';
            }

            card.appendChild(closeElement);


            cardContainer.appendChild(card);

            overlayShowMessage.style.display = 'block';

        });

        document.querySelector('#messageInbox').appendChild(newRow);
    }

    async function createMessage(id, typeMessage = "excuse", description, field) {
        let resultCreate = await pb.collection('message').create({

            idUser: id,
            type_message: typeMessage,
            description: description,
            field: field,

        });
        console.log(resultCreate);
    }

    async function onCreateMessage() {

        let idUser = userData.id;
        let typeMessage = "message";
        let description = document.getElementById('description').value;
        let field = document.getElementById('field').files[0];

        await createMessage(idUser, typeMessage, description, field);
        window.location.reload();
    }

    let createBtn = document.getElementById('send-btn');
    createBtn.onclick = async (event) => {
        event.preventDefault();
        await onCreateMessage();
        window.location.reload();
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