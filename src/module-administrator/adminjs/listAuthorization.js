import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('authorization').getList(1, 50, {
        });

        for (let i = 0; i < resultList.items.length; i++) {
            let listAuthorization = resultList.items[i];
       
            let newRow = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = listAuthorization.id;
            newRow.appendChild(idCell);

            let idAssistenceCell = document.createElement('td');
            idAssistenceCell.textContent = listAuthorization.idAssistence;
            newRow.appendChild(idAssistenceCell);

            let createdCell = document.createElement('td');
            createdCell.textContent = listAuthorization.created;
            newRow.appendChild(createdCell);

            document.querySelector('#listAuthorization').appendChild(newRow);


    }

}

getUserInfo();