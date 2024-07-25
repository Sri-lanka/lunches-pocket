import { pb } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "index.html";
        return;
    }

    async function updateMessage(id, description, field) {
        let result = await pb.collection('message').update(id, {
            description: description,
            field: field,
        });
        console.log(result);
    }

    async function createMessage(idUser, type_message, description, field, Recipient) {
        let result = await pb.collection('message').create({
            idUser: idUser,
            type_message: type_message,
            description: description,
            field: field,
            Recipient: Recipient,
        });
        console.log(result);
    }

    async function deleteUser(id) {
        let result = await pb.collection('message').delete(id);
        console.log(result);
    }


    const resultList = await pb.collection('message').getList(1, 50, {
        expand: 'Recipient'
    });

    for (let i = 0; i < resultList.items.length; i++) {
        let listMessage = resultList.items[i];

        let newRow = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = listMessage.id;
        newRow.appendChild(idCell);

        let idUserCell = document.createElement('td')
        idUserCell.textContent = listMessage.idUser;
        newRow.appendChild(idUserCell);

        let typeMessageCell = document.createElement('td')
        typeMessageCell.textContent = listMessage.type_message;
        newRow.appendChild(typeMessageCell);

        let descriptionCell = document.createElement('td')
        descriptionCell.textContent = listMessage.description;
        newRow.appendChild(descriptionCell);

        let fieldCell = document.createElement('td')
        //fieldCell.textContent = listMessage.field;
        let fileurl = `${pb.baseUrl}/api/files/${listMessage.collectionId}/${listMessage.id}/${listMessage.field}`;
        
        if (!listMessage.field) {
            fieldCell.textContent = 'No found file';
            newRow.appendChild(fieldCell);
        }else {
            let link = document.createElement('a');
            link.href = fileurl;
            link.textContent = 'donwload archive';
            link.target = '_blank';
            fieldCell.appendChild(link);
            fieldCell.href = 
            newRow.appendChild(fieldCell);
        }

        let Recipient = document.createElement('td')
        console.log(listMessage.Recipient);
        if (!listMessage.Recipient ) {
            Recipient.textContent = 'All administrators';
            newRow.appendChild(Recipient);
        }else{
            Recipient.textContent = listMessage.Recipient;
            newRow.appendChild(Recipient);
        }
        let createdCell = document.createElement('td')
        createdCell.textContent = listMessage.created;
        newRow.appendChild(createdCell);

        let updateCell = document.createElement('td')
        updateCell.textContent = listMessage.updated;
        newRow.appendChild(updateCell);

        let messageUpdateBtn = document.createElement('a');
        messageUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
        let messageUpdateTd = document.createElement('td');

        messageUpdateTd.appendChild(messageUpdateBtn);
        newRow.appendChild(messageUpdateTd);
    

        messageUpdateBtn.onclick = async () => {
            overlayUpdate.style.display = 'block';

            let description = document.getElementById('descriptionUpdate');
            description.value = listMessage.description;            
            let fieldUpdate = document.getElementById('fieldUpdate');
            fieldUpdate.files = listMessage.field;
           
            let updateFormBtn = document.getElementById('update-form-btn');
            updateFormBtn.onclick = async (event) => {
                event.preventDefault();
                await updateMessage(listMessage.id, description.value, fieldUpdate.files[0]);
                window.location.reload();
               
            }
        
        }
    
        document.querySelector('#listMessage').appendChild(newRow);

    }
    async function onCreateMessage() {

        let userSenderCreate = document.getElementById('user-select').value;
        let userReciepientCreate = document.getElementById('user-select-reciepient').value;
        let type_messageCreate = document.getElementById('type_message').value;
        let descriptionCreate = document.getElementById('descriptionCreate').value;
        let fieldCreate = document.getElementById('fieldCreate').files[0];

        await createMessage(userSenderCreate, type_messageCreate, descriptionCreate, fieldCreate, userReciepientCreate);
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';

        let userSender = await pb.collection('users').getFullList(
        );
        let userSelect = document.getElementById('user-select');
        userSelect.innerHTML = '';
        userSender.forEach(userSender => {
            console.log(userSender);
            let option = document.createElement('option');
            option.value = userSender.id;
            option.innerHTML = userSender.email;
            userSelect.appendChild(option);
        });

        let userReciepient = await pb.collection('users').getFullList({
            filter: `rol = "user"`,
        });
        let userReciepientSelect = document.getElementById('user-select-reciepient');
        userReciepientSelect.innerHTML = '';
        userReciepient.forEach(userReciepient => {
            console.log(userReciepient);
            let option = document.createElement('option');
            option.value = userReciepient.id;
            option.innerHTML = userReciepient.email;
            userReciepientSelect.appendChild(option);
        });

        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('click', async (event) => {
            event.preventDefault();
            await onCreateMessage();
        })


    }

    let createBtnCancel = document.getElementById('create-form-cancel');
    createBtnCancel.onclick = () => {
        overlayCreate.style.display = 'none';
    }
    let updateBtnCancel = document.getElementById('update-form-cancel');
    updateBtnCancel.onclick = () => {
        overlayUpdate.style.display = 'none';
    }
}

getUserInfo();