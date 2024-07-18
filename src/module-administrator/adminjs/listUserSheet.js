import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('user_sheet').getList(1, 50, {
        });

        for (let i = 0; i < resultList.items.length; i++) {
            let listUserSheet = resultList.items[i];
       
            let newRow = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = listUserSheet.id;
            newRow.appendChild(idCell);

            let id_sheetCell = document.createElement('td')
            id_sheetCell.textContent = listUserSheet.id_sheet;
            newRow.appendChild(id_sheetCell);

            let id_userCell = document.createElement('td')
            id_userCell.textContent = listUserSheet.id_user;
            newRow.appendChild(id_userCell);

            let stateCell = document.createElement('td')
            stateCell.textContent = listUserSheet.state;
            newRow.appendChild(stateCell);

            let createdCell = document.createElement('td')
            createdCell.textContent = listUserSheet.created;
            newRow.appendChild(createdCell);



            document.querySelector('#listUserSheet').appendChild(newRow);


    }

}

getUserInfo();