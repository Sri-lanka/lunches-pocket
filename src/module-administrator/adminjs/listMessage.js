import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('message').getList(1, 50, {
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
            typeMessageCell.textContent = listMessage.typeMessage;
            newRow.appendChild(typeMessageCell);

            let descriptionCell = document.createElement('td')
            descriptionCell.textContent = listMessage.description;
            newRow.appendChild(descriptionCell);

            let fieldCell = document.createElement('td')
            fieldCell.textContent = listMessage.field;
            newRow.appendChild(fieldCell);

            let Recipient = document.createElement('td')
            Recipient.textContent = listMessage.Recipient;
            newRow.appendChild(Recipient);

            let createdCell = document.createElement('td')
            createdCell.textContent = listMessage.created;
            newRow.appendChild(createdCell);

            let updateCell = document.createElement('td')
            updateCell.textContent = listMessage.update;
            newRow.appendChild(updateCell);
            
            document.querySelector('#listMessage').appendChild(newRow);


    }

}

getUserInfo();