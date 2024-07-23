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

    async function updateAuthorization(idAssistance, dateAplication) {
        let result = await pb.collection('authorization').update(id, {
            idAssistance: idAssistance,
            dateAplication: dateAplication,
        });
        console.log(result);
    }

    async function createAuthorization(idAssistance, dateAplication) {
        let result = await pb.collection('authorization').create({
            idAssistance: idAssistance,
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
        idAssistenceCell.textContent = listAuthorization.idAssistance;
        newRow.appendChild(idAssistenceCell);


        let createdCell = document.createElement('td');
        createdCell.textContent = listAuthorization.created;
        newRow.appendChild(createdCell);

        let authorizationUpdateBtn = document.createElement('a');
        authorizationUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
        let authorizationUpdateTd = document.createElement('td');

        authorizationUpdateTd.appendChild(authorizationUpdateBtn);
        newRow.appendChild(authorizationUpdateTd);

        authorizationUpdateBtn.onclick = async () => {
            overlayUpdate.style.display = 'block';

            let assistance = await pb.collection('assistance').getFullList(
                { expand: 'idUser' }
            );
            let assistanceSelect = document.getElementById('assistance-select-Update');
            assistanceSelect.innerHTML = '';
    
            assistance.forEach(assistance => {
                let option = document.createElement('option');
                option.value = assistance.id;
                option.innerHTML = assistance.expand.idUser.name;
                option.innerHTML += " " + "document: " + assistance.expand.idUser.document;
                assistanceSelect.appendChild(option);
            });

            let assistanceUpdate = document.getElementById('assistance-select-Update').value;
            let dateAplicationUpdate = document.getElementById('dateAplicationUpdate').value;

            let updateFormBtn = document.getElementById('update-form-btn');
            updateFormBtn.onclick = async (event) => {
                event.preventDefault();

                await updateAssistance(listAuthorization.id, assistanceUpdate, dateAplicationUpdate);
                window.location.reload();
            }

        }
        let authorizationDeleteBtn = document.createElement('a');
        authorizationDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';
        let authorizationDeleteTd = document.createElement('td');
        authorizationDeleteTd.appendChild(authorizationDeleteBtn);
        newRow.appendChild(authorizationDeleteTd);

        authorizationDeleteBtn.onclick = async () => {
            await deleteAssistance(listAssistance.id);
            window.location.reload();
        }

        document.querySelector('#listAuthorization').appendChild(newRow);


    }

    async function OnCreateAuthorization() {
        let assistanceCreate = document.getElementById('assistance-select-Create').value;
        let dateAplicationCreate = document.getElementById('dateAplicationCreate').value;
        await createAuthorization(assistanceCreate, dateAplicationCreate);
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';
        let assistance = await pb.collection('assistance').getFullList(
            { expand: 'idUser' }
        );
        let assistanceSelect = document.getElementById('assistance-select-Create');
        assistanceSelect.innerHTML = '';

        assistance.forEach(assistance => {
            let option = document.createElement('option');
            option.value = assistance.id;
            option.innerHTML = assistance.expand.idUser.name;
            option.innerHTML += " " + "document: " + assistance.expand.idUser.document;
            assistanceSelect.appendChild(option);
        });

        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('click', async () => {
            await OnCreateAuthorization();
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