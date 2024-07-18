import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('program').getList(1, 50, {
        });

        for (let i = 0; i < resultList.items.length; i++) {
            let listProgram = resultList.items[i];
       
            let newRow = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = listProgram.id;
            newRow.appendChild(idCell);

            let nameCell = document.createElement('td')
            nameCell.textContent = listProgram.name;
            newRow.appendChild(nameCell);

            let createdCell = document.createElement('td')
            createdCell.textContent = listProgram.created;
            newRow.appendChild(createdCell);

            let updateCell = document.createElement('td')
            updateCell.textContent = listProgram.updated;
            newRow.appendChild(updateCell);


            document.querySelector('#listProgram').appendChild(newRow);


    }

}

getUserInfo();