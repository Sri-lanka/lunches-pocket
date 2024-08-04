
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


    async function updateMessage(id, description, field, approved) {
        let result = await pb.collection('message').update(id, {
            description: description,
            field: field,
            approved: approved,
        });
        console.log(result);
    }

    async function createMessage(idUser, type_message, description, field, Recipient, approved) {
        let result = await pb.collection('message').create({
            idUser: idUser,
            type_message: type_message,
            description: description,
            field: field,
            Recipient: Recipient,
            approved: approved,
        });
        console.log(result);
    }

    async function deleteMessage(id) {
        let result = await pb.collection('message').delete(id);
        console.log(result);
    }

    async function fetchAndDisplayMessage(userDocument = '') {

        const resultList = await pb.collection('message').getList(1, 50, {
            sort: '-created',
            expand: 'Recipient, idUser',
        });

        let dataSelector = document.getElementById('dataFilter').value;
        let filteredResults = resultList.items;

        if (userDocument == '' && dataSelector == '2') {
            filteredResults = resultList.items.filter(item => {
                if (item.expand && !item.expand.Recipient) {
                    return true;
                } else if (!item.expand) {
                    return true;
                } else {
                    return false;
                }
            });
        } else if (userDocument !== '' && dataSelector == '2') {
            filteredResults = resultList.items.filter(item => {
                if (item.expand && item.expand.Recipient) {
                    return item.expand.Recipient.document == userDocument;
                } else {
                    return false;
                }
            });
        } else if (userDocument !== '' && dataSelector == '3') {
            filteredResults = resultList.items.filter(item => {
                if (item.expand && item.expand.idUser) {
                    return item.expand.idUser.document == userDocument;
                } else {
                    return false;
                }
            });
        } else if (dataSelector == '1') {

        }

        console.log(filteredResults);

        document.querySelector('#listMessage').innerHTML = '';

        for (let i = 0; i < filteredResults.length; i++) {
            let listMessage = filteredResults[i];
            //console.log(listMessage);

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
            if (listMessage.type_message == 'excuse') {
                typeMessageCell.innerHTML += "<br>" + "(Approved:" + listMessage.approved + ")";
            }
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

                const div = document.createElement('hr');
                card.appendChild(div);


                const typeMessageElement = document.createElement('p');
                typeMessageElement.textContent = listMessage.type_message;
                if (listMessage.type_message == 'excuse') {
                    typeMessageElement.innerHTML += "<br>" + "(Approved:" + listMessage.approved + ")";
                }
                card.appendChild(typeMessageElement);

                const descriptionElement = document.createElement('p');
                descriptionElement.className = 'description';
                descriptionElement.textContent = listMessage.description;
                card.appendChild(descriptionElement);

                const div1 = document.createElement('hr');
                card.appendChild(div1)

                if (listMessage.field) {
                    const nameFile = document.createElement('p');
                    nameFile.textContent = "Name: " + listMessage.field;
                    card.appendChild(nameFile);
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

                const div2 = document.createElement('hr');
                card.appendChild(div2);




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

                let selectApproved = document.getElementById('approvedDiv2');
                if (listMessage.type_message == 'excuse') {
                    selectApproved.style.display = 'block';
                } else {
                    selectApproved.style.display = 'none';
                }
                let approvedUpdate = document.getElementById('approvedUpdate');
                approvedUpdate.value = listMessage.approved;


                let updateFormBtn = document.getElementById('update-form-btn');
                updateFormBtn.onclick = async (event) => {
                    event.preventDefault();
                    try {
                        await updateMessage(listMessage.id, description.value, fieldUpdate.files[0], approvedUpdate.value);
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
    }


    window.addEventListener('load', () => {
        fetchAndDisplayMessage();
    });

    document.getElementById('filterBtn').addEventListener('click', () => {
        let userDocument = document.getElementById('userDocumentInput').value.trim();
        fetchAndDisplayMessage(userDocument);
    });

    async function updateUserSelect(filter) {
        try {

            let userSelectSender = document.getElementById('user-select');

            let userSender = await pb.collection('users').getFullList({
                filter: filter,
            }
            );

            userSelectSender.innerHTML = '';
            if (userSender.length == 0) {
                alert("No users found");
                let filter = "";
                updateUserSelect(filter);
                userSender.forEach(userSender => {
                    console.log(userSender);
                    let option = document.createElement('option');
                    option.value = userSender.id;
                    option.innerHTML = userSender.email;
                    userSelectSender.appendChild(option);
                });
            } else {
                alert("Users found: " + " " + userSender.length);
                userSender.forEach(userSender => {
                    console.log(userSender);
                    let option = document.createElement('option');
                    option.value = userSender.id;
                    option.innerHTML = userSender.email;
                    userSelectSender.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    async function updateRecipientSelect(filter) {
        try {

            let userReciepientSelect = document.getElementById('user-select-reciepient');

            let userReciepient = await pb.collection('users').getFullList({
                filter: filter,
            }
            );

            userReciepientSelect.innerHTML = '';
            if (userReciepient.length == 0) {
                alert("No users found");
                let filter = 'rol = "user"';
                updateRecipientSelect(filter);
                userReciepient.forEach(userReciepient => {
                    console.log(userReciepient);
                    let option = document.createElement('option');
                    option.value = userReciepient.id;
                    option.innerHTML = userReciepient.email;
                    userReciepientSelect.appendChild(option);
                });
            } else {
                alert("Users found: " + " " + userReciepient.length);
                userReciepient.forEach(userReciepient => {
                    console.log(userReciepient);
                    let option = document.createElement('option');
                    option.value = userReciepient.id;
                    option.innerHTML = userReciepient.email;
                    userReciepientSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function onCreateMessage() {

        let userSenderCreate = document.getElementById('user-select').value;
        let userReciepientCreate = document.getElementById('user-select-reciepient').value;
        let type_messageCreate = document.getElementById('type_message').value;
        let descriptionCreate = document.getElementById('descriptionCreate').value;
        let fieldCreate = document.getElementById('fieldCreate').files[0];
        let approvedCreate = document.getElementById('approvedCreate').value;

        try {
            await createMessage(userSenderCreate, type_messageCreate, descriptionCreate, fieldCreate, userReciepientCreate, approvedCreate);
            alert('Message created successfully');
            window.location.reload();
        } catch (error) {
            alert("Error creating message: " + error);
        }
    }


    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        

        overlayCreate.style.display = 'block';
        let applyFilterBtn = document.getElementById('apply-filter-btn');
        let filterInput = document.getElementById('filter-input');

  

        let filter = '';
        await updateUserSelect(filter);

        let filterRecipient = 'rol = "user"';
        await updateRecipientSelect(filterRecipient);

        applyFilterBtn.addEventListener('click', async (e) => {
            let typeUser = document.getElementById('type_user').value;
            e.preventDefault();
            if (typeUser == 'sender') {
                let filterValue = filterInput.value;
                let filter = `document = "${filterValue}"`;
                await updateUserSelect(filter);
            } else if (typeUser == 'recipient') {
                let filterValue = filterInput.value;
                let filter = `rol = "user" && document = "${filterValue}"`;
                await updateRecipientSelect(filter);
            } else {
                let filterRecipient = 'rol = "user"';
                let filter = "";
                await updateRecipientSelect(filterRecipient);
                await updateUserSelect(filter);
            }
            
        });



        let type_messageCreate = document.getElementById('type_message');
        let selectApproved = document.getElementById('approvedDiv');
        selectApproved.style.display = 'block';
        type_messageCreate.onclick = async (e) => {
            e.preventDefault();
            if (type_messageCreate.value == 'excuse') {
                selectApproved.style.display = 'block';
            } else {
                selectApproved.style.display = 'none';
            }
        }




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