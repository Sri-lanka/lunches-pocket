import { pb } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
    async function deleteAuthorization(id) {
        let result = await pb.collection('authorization').delete(id);
        console.log(result);
    }

    async function updateAuthorization(id,) {
        let result = await pb.collection('authorization').update(id, {
            dateAplication: dateAplication,
        });
        console.log(result);
    }

    async function createAuthorization(idAssistence, dateAplication) {
        let result = await pb.collection('authorization').create({
            idAssistence: idAssistence,
            dateAplication: dateAplication,
        });
        console.log(result);
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

    async function OnCreateAuthorization() {

        let user = document.getElementById('user-select').value;
        let verification = document.getElementById('verificationCreate').checked;

        await createAssistance(user, verification);
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';

        let assistance = await pb.collection('assistance').getFullList(
            { expand: 'idUser' }
        );

        console.log(assistance);

        let assistanceSelect = document.getElementById('assistance-select');
        assistanceSelect.innerHTML = '';

        assistance.forEach(assistance => {
            let option = document.createElement('option');
            console.log(assistance);
            option.value = assistance.id;

            option.innerHTML = assistance.expand.idUser.name;
      
            assistanceSelect.appendChild(option);
        });

        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('click', async () => {
            await OnCreateAuthorization();
        })
    }
}

getUserInfo();