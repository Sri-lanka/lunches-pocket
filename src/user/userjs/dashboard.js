import { pb, formatDate } from '../../../global.js';
let overlayShowMessage = document.getElementById('overlay-show-message');


async function getUserInfo() {

    if (!pb.authStore.isValid) {
        window.location.href = "home.html";
        return;
    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);


    console.log(user.username);




    const result = await pb.collection('sheet_user').getList(1, 50, {
        filter: `idUser = "${user.id}"`,
    });

    let listData = result.items[0];
    //console.log(listData);
    let userSheetElement = document.querySelector('#user-info');
    userSheetElement.innerHTML = '<li> ' + listData.name + '</li>';
    userSheetElement.innerHTML += '<li> ' + listData.last_name + '</li>';
    userSheetElement.innerHTML += '<li>Sheet: ' + listData.N_sheet + '</li>';
    userSheetElement.innerHTML += '<li>state: ' + listData.state + '</li>';


    const resultOutbox = await pb.collection('message_user').getList(1, 50, {
        filter: `idUser = "${user.id}"`,
        expand: 'Recipient, idUser',
        sort: '-created'
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

        let showTd = document.createElement('td');
        let showBtn = document.createElement('a');
        showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
        showTd.appendChild(showBtn);
        newRow.appendChild(showTd);
        showBtn.addEventListener('click', async () => {
            const cardContainer = document.getElementById('cardContainer');

            cardContainer.innerHTML = '';

            const card = document.createElement('div');
            card.className = 'card';

            const senderElement = document.createElement('h3');
            senderElement.textContent = listOutbox.expand.idUser.email;
            card.appendChild(senderElement);

            const div = document.createElement('hr');
            card.appendChild(div);

            const typeMessageElement = document.createElement('p');
            typeMessageElement.textContent = "Message";
            card.appendChild(typeMessageElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'description';
            descriptionElement.textContent = listOutbox.description;
            card.appendChild(descriptionElement);

            const div1 = document.createElement('hr');
            card.appendChild(div1)

            if (listOutbox.field) {
                const nameFile = document.createElement('p');
                nameFile.textContent = listOutbox.field;
                card.appendChild(nameFile);
                const attachmentElement = document.createElement('a');
                attachmentElement.className = 'attachment';
                attachmentElement.href = `${pb.baseUrl}/api/files/${listOutbox.collectionId}/${listOutbox.id}/${listOutbox.field}`;
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
            const createdFormat = await formatDate(listOutbox.created);
           
            createdElement.innerHTML +=   createdFormat;
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
        document.querySelector('#messageOutbox').appendChild(newRow);
    }


    const resultInbox = await pb.collection('message_user_report').getList(1, 50, {
        filter: `Recipient = "${user.id}"`,
        expand: 'Recipient, idUser',
        sort: '-created'
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

        let showTd = document.createElement('td');
        let showBtn = document.createElement('a');
        showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
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
            RecipientElement.textContent = "Recipient : You";
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

    async function createMessage(id, typeMessage = "excuse", description, field, approved) {
        let resultCreate = await pb.collection('message').create({

            idUser: id,
            type_message: typeMessage,
            description: description,
            field: field,
            approved: approved,

        });
        console.log(resultCreate);
    }

    async function onCreateMessage() {

        let idUser = user.id;
        let typeMessage = "excuse";
        let description = document.getElementById('description').value;
        let field = document.getElementById('field').files[0];
        let approved = "Pending";

        await createMessage(idUser, typeMessage, description, field, approved);
        window.reload();
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
    window.location.href = "home";
});
document.querySelector('#data-btn').addEventListener('click', async () => {
    window.location.href = "data";
});
document.querySelector('#history-btn').addEventListener('click', async () => {
    window.location.href = "history";
});