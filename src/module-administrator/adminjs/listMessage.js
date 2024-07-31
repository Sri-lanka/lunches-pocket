
import { pb, formatDate } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');
let overlayDelete = document.getElementById('overlay-delete');
let overlayShowMessage = document.getElementById('overlay-show-message');
async function isValid() {
    if (!pb.authStore.isValid) {
        window.location.href = "../../../login";
        return;

    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (user.rol != 'admin') {
        window.location.href = "home";
        return;
    }
}

isValid();
async function getUserInfo() {


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

    async function deleteMessage(id) {
        let result = await pb.collection('message').delete(id);
        console.log(result);
    }


    const resultList = await pb.collection('message').getList(1, 50, {
        expand: 'Recipient, idUser'
    });

    for (let i = 0; i < resultList.items.length; i++) {
        let listMessage = resultList.items[i];
        console.log(listMessage);

        let newRow = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = listMessage.id;
        newRow.appendChild(idCell);

        let idUserCell = document.createElement('td')
        idUserCell.textContent = listMessage.idUser;
        idUserCell.innerHTML += "<br>" + "(" + listMessage.expand.idUser.email + ")";
        newRow.appendChild(idUserCell);

        let typeMessageCell = document.createElement('td')
        typeMessageCell.textContent = listMessage.type_message;
        newRow.appendChild(typeMessageCell);

        let descriptionCell = document.createElement('td')
        let description = listMessage.description;
        if (description.length > 20) {
            description = description.substring(0, 17) + '...';
        }
        descriptionCell.textContent = description;
        newRow.appendChild(descriptionCell);

        let fieldCell = document.createElement('td')
        let fileurl = `${pb.baseUrl}/api/files/${listMessage.collectionId}/${listMessage.id}/${listMessage.field}`;

        if (!listMessage.field) {
            fieldCell.textContent = 'NO FILE ATTACHED';
            newRow.appendChild(fieldCell);
        } else {
            let link = document.createElement('a');
            link.href = fileurl;
            link.textContent = 'DOWNLOAD';
            link.target = '_blank';
            fieldCell.appendChild(link);
            fieldCell.href =
                newRow.appendChild(fieldCell);
        }
        let Recipient = document.createElement('td')
        if (!listMessage.Recipient) {
            Recipient.textContent = 'All administrators';
        } else {
            Recipient.textContent = listMessage.Recipient;
            Recipient.innerHTML += " (" + listMessage.expand.Recipient.email + ")";
        }

        newRow.appendChild(Recipient);



        let createdCell = document.createElement('td')
        const createdFormat = await formatDate(listMessage.created);
        createdCell.textContent = listMessage.created;
        createdCell.innerHTML += "<br>" + "(" + createdFormat + ")";
        newRow.appendChild(createdCell);

        let updateCell = document.createElement('td')
        const updateFormat = await formatDate(listMessage.updated);
        updateCell.textContent = listMessage.updated;
        updateCell.innerHTML += "<br>" + "(" + updateFormat + ")";
        newRow.appendChild(updateCell);

        let showMessage = document.createElement('a');
        showMessage.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
        let showMessageTd = document.createElement('td');

        showMessageTd.appendChild(showMessage);
        newRow.appendChild(showMessageTd);

        showMessage.onclick = async () => {
            const cardContainer = document.getElementById('cardContainer');

            cardContainer.innerHTML = '';

            const card = document.createElement('div');
            card.className = 'card';

            const senderElement = document.createElement('h3');
            senderElement.textContent = listMessage.expand.idUser.email;
            card.appendChild(senderElement);

            const typeMessageElement = document.createElement('p');
            typeMessageElement.textContent = listMessage.type_message;
            card.appendChild(typeMessageElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'description';
            descriptionElement.textContent = listMessage.description;
            card.appendChild(descriptionElement);

            if (listMessage.field) {
                const attachmentElement = document.createElement('a');
                attachmentElement.className = 'attachment';
                attachmentElement.href = `${pb.baseUrl}/api/files/${listMessage.collectionId}/${listMessage.id}/${listMessage.field}`;
                attachmentElement.textContent = 'show file';
                attachmentElement.target = '_blank';
                card.appendChild(attachmentElement);
            } else {
                const attachmentElement = document.createElement('p');
                attachmentElement.textContent = 'NO FILE ATTACHED';
                card.appendChild(attachmentElement);
            }


            const RecipientElement = document.createElement('p');
            if (!listMessage.Recipient) {
                RecipientElement.textContent = 'All administrators';
            } else {
                RecipientElement.textContent = listMessage.Recipient;
                RecipientElement.innerHTML += " (" + listMessage.expand.Recipient.email + ")";
            }
            card.appendChild(RecipientElement);

            const createdElement = document.createElement('p');
            const createdFormat = await formatDate(listMessage.created);
            createdElement.textContent = listMessage.created;
            createdElement.innerHTML += "<br>" + "(" + createdFormat + ")";



            const closeElement = document.createElement('button');
            closeElement.innerHTML = 'close';
            closeElement.onclick = () => {
                overlayShowMessage.style.display = 'none';
            }

            card.appendChild(closeElement);


            cardContainer.appendChild(card);

            overlayShowMessage.style.display = 'block';

        }

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

            let updateFormBtn = document.getElementById('update-form-btn');
            updateFormBtn.onclick = async (event) => {
                event.preventDefault();
                try {
                    await updateMessage(listMessage.id, description.value, fieldUpdate.files[0]);
                    alert("Message updated successfully");
                    window.location.reload();
                } catch (error) {
                    alert("Error updating message: " + error);
                }

            }

        }

        let messageDeleteBtn = document.createElement('a');
        messageDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';
        let messageDeleteTd = document.createElement('td');
        messageDeleteTd.appendChild(messageDeleteBtn);
        newRow.appendChild(messageDeleteTd);

        messageDeleteBtn.onclick = async () => {
            overlayDelete.style.display = 'block';
            let deleteFormBtn = document.getElementById('delete-form-btn');
            deleteFormBtn.onclick = async (event) => {
                event.preventDefault();
                try {
                    await deleteMessage(listMessage.id);
                    alert("Message deleted successfully");
                    window.location.reload();
                } catch (error) {
                    alert("Error deleting message: " + error);
                }
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

        try {
            await createMessage(userSenderCreate, type_messageCreate, descriptionCreate, fieldCreate, userReciepientCreate);
            alert('Message created successfully');
            window.location.reload();
        } catch (error) {
            alert("Error creating message: " + error);
        }
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
            event.preventDefault(event);
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
    let deleteBtnCancel = document.getElementById('delete-form-cancel');
    deleteBtnCancel.onclick = () => {
        cardContainer.innerHTML = '';
        overlayDelete.style.display = 'none';

    }

    document.querySelector('#logout-btn').addEventListener('click', async () => {
        pb.authStore.clear();
        window.location.replace("../../../login.html");
    });

}

getUserInfo();