import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('assistance').getList(1, 50, {
        });

        for (let i = 0; i < resultList.items.length; i++) {
            let listAssistance = resultList.items[i];
       
            let newRow = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = listAssistance.id;
            newRow.appendChild(idCell);

            let idUserCell = document.createElement('td');
            idUserCell.textContent = listAssistance.idUser;
            newRow.appendChild(idUserCell);

            let verificationCell = document.createElement('td');
            verificationCell.textContent = listAssistance.verification;
            newRow.appendChild(verificationCell);

            let createdCell = document.createElement('td');
            createdCell.textContent = listAssistance.created;
            newRow.appendChild(createdCell);

            document.querySelector('#listAssistence').appendChild(newRow);


    }

}
getUserInfo();