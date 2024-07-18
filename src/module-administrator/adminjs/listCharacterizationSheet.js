
import { pb } from '../../../global.js';

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
        const resultList = await pb.collection('characterization_sheet').getList(1, 50, {
        });

        for (let i = 0; i < resultList.items.length; i++) {
            let listCharacterizationSheet = resultList.items[i];
       
            let newRow = document.createElement('tr');

            let idCell = document.createElement('td');
            idCell.textContent = listCharacterizationSheet.id;
            newRow.appendChild(idCell);

            let N_sheetCell = document.createElement('td');
            N_sheetCell.textContent = listCharacterizationSheet.N_sheet;
            newRow.appendChild(N_sheetCell);

            let id_programCell = document.createElement('td');
            id_programCell.textContent = listCharacterizationSheet.id_program;
            newRow.appendChild(id_programCell);

            let createdCell = document.createElement('td');
            createdCell.textContent = listCharacterizationSheet.created;
            newRow.appendChild(createdCell);

            let endCell = document.createElement('td');
            endCell.textContent = listCharacterizationSheet.end;
            newRow.appendChild(endCell);

            document.querySelector('#listCharacterizationSheet').appendChild(newRow);


    }

}

getUserInfo();