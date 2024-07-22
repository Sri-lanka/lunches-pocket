import { pb } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }


    async function deleteAssistance(id) {
        let result = await pb.collection('assistance').delete(id);
        console.log(result);
    }

    async function updateAssistance(id, verification) {
        let result = await pb.collection('assistance').update(id, {
            verification: verification,
        });
        console.log(result);
    }

    async function createAssistance(id, verification) {
        let result = await pb.collection('assistance').create({
            idUser: id,
            verification: verification,
        });
        console.log(result);
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

        let userUpdateBtn = document.createElement('a');
        userUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
        let userUpdateTd = document.createElement('td');

        userUpdateTd.appendChild(userUpdateBtn);
        newRow.appendChild(userUpdateTd);

        userUpdateBtn.onclick = async () => {
            overlayUpdate.style.display = 'block';

            let verification = document.getElementById('verificationUpdate');
            verification.checked = listAssistance.verification;

            let updateFormBtn = document.getElementById('update-form-btn');
            updateFormBtn.onclick = async (event) => {
                event.preventDefault();

                await updateAssistance(listAssistance.id, verification.checked);
                window.location.reload();
            }

        }

        let userDeleteBtn = document.createElement('a');
        userDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';
        let userDeleteTd = document.createElement('td');
        userDeleteTd.appendChild(userDeleteBtn);
        newRow.appendChild(userDeleteTd);

        userDeleteBtn.onclick = async () => {
            await deleteAssistance(listAssistance.id);
            window.location.reload();
        }

        document.querySelector('#listAssistence').appendChild(newRow);


    }

    async function onCreateAssistance() {

        let user = document.getElementById('user-select').value;
        let verification = document.getElementById('verificationCreate').checked;

        await createAssistance(user, verification);
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';

        let users = await pb.collection('users').getFullList({
            filter: `rol = "user"`,
        });
        let userSelect = document.getElementById('user-select');

        userSelect.innerHTML = '';
        users.forEach(user => {
            console.log(user);
            let option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.email;
            userSelect.appendChild(option);
        });

        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('click', async () => {
            await onCreateAssistance();
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