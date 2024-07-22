import { pb } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }




    async function updateUser(id, document, type_document, name, last_name, email, telephone, state, rol, oldPassword, password, passwordConfirm) {

        let result = await pb.collection('users').update(id, {
            document: document,
            type_document: type_document,
            name: name,
            last_name: last_name,
            email: email,
            telephone: telephone,
            state: state,
            rol: rol,
            oldPassword: oldPassword,
            password: password,
            passwordConfirm: passwordConfirm
        });
        console.log(result);
    }

    async function createUsers(document, type_document, name, last_name, email, telephone, state, rol, password, passwordConfirm) {
        let result = await pb.collection('users').create({
            document: document,
            type_document: type_document,
            name: name,
            last_name: last_name,
            email: email,
            telephone: telephone,
            state: state,
            rol: rol,
            password: password,
            passwordConfirm: passwordConfirm
        });
        console.log(result);
    }

    async function deleteUser(id) {
        let result = await pb.collection('users').delete(id);
        console.log(result);
    }



    const resultList = await pb.collection('users').getList(1, 100, {
    });
    //console.log(resultList);

    for (let i = 0; i < resultList.items.length; i++) {

        let listUser = resultList.items[i];
        //console.log(listUser);
        let newRow = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = listUser.id;
        newRow.appendChild(idCell);

        let documentCell = document.createElement('td');
        documentCell.textContent = listUser.document;
        newRow.appendChild(documentCell);

        let typeDocumentCell = document.createElement('td');
        typeDocumentCell.textContent = listUser.type_document;
        newRow.appendChild(typeDocumentCell);

        let usernameCell = document.createElement('td');
        usernameCell.textContent = listUser.username;
        newRow.appendChild(usernameCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = listUser.name;
        newRow.appendChild(nameCell);

        let lastNameCell = document.createElement('td');
        lastNameCell.textContent = listUser.last_name;
        newRow.appendChild(lastNameCell);

        let emailCell = document.createElement('td');
        emailCell.textContent = listUser.email;
        newRow.appendChild(emailCell);
        console.log(listUser.email);

        let telephoneCell = document.createElement('td');
        telephoneCell.textContent = listUser.telephone;
        newRow.appendChild(telephoneCell);

        let stateCell = document.createElement('td');
        stateCell.textContent = listUser.state;
        newRow.appendChild(stateCell);

        let rolCell = document.createElement('td');
        rolCell.textContent = listUser.rol;
        newRow.appendChild(rolCell);

        let userUpdateBtn = document.createElement('a');
        userUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
        let userUpdateTd = document.createElement('td');

        userUpdateTd.appendChild(userUpdateBtn);
        newRow.appendChild(userUpdateTd);

        userUpdateBtn.onclick = async () => {

            overlayUpdate.style.display = 'block';

            let updateFormBtn = document.getElementById('update-form-btn');
            updateFormBtn.onclick = async (event) => {
                event.preventDefault();
                let documentUpdate = document.getElementById('documentUpdate').value;
                let typeDocumentUpdate = document.getElementById('typeDocumentUpdate').value;
                let usernameUpdate = document.getElementById('usernameUpdate').value;
                let last_nameUpdate = document.getElementById('last_nameUpdate').value;
                let emailUpdate = document.getElementById('emailUpdate').value;
                let telephoneUpdate = document.getElementById('telephoneUpdate');
                let stateUpdate = document.getElementById('stateUpdate').value;
                let rolUpdate = document.getElementById('rolUpdate').value;
                let oldPassword = document.getElementById('oldPassword').value;
                let passwordUpdate = document.getElementById('passwordUpdate').value;
                let passwordConfirmUpdate = document.getElementById('passwordConfirmUpdate').value;

                await updateUser(listUser.id, documentUpdate, typeDocumentUpdate, usernameUpdate, last_nameUpdate, emailUpdate, telephoneUpdate, stateUpdate, rolUpdate, oldPassword, passwordUpdate, passwordConfirmUpdate);
                window.location.reload();
            }

        }

        let userDeleteBtn = document.createElement('a');
        userDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';

        let userDeleteTd = document.createElement('td');
        userDeleteTd.appendChild(userDeleteBtn);
        newRow.appendChild(userDeleteTd);
        

        userDeleteBtn.onclick = async () => {
            await deleteUser(listUser.id);
            window.location.reload();
        }
        
        document.querySelector('#listUsers').appendChild(newRow);


    }

    async function onCreateUsers() {
        let documentCreate = document.getElementById('documentCreate').value;
        let typeDocumentCreate = document.getElementById('typeDocumentCreate').value;
        let usernameCreate = document.getElementById('usernameCreate').value;
        let last_nameCreate = document.getElementById('last_nameCreate').value;
        let emailCreate = document.getElementById('emailCreateCreate').value;
        let telephoneCreate = document.getElementById('telephoneCreate').value;
        let stateCreate = document.getElementById('stateCreate').value;
        let rolCreate = document.getElementById('rolCreate').value;
        let passwordCreate = document.getElementById('passwordCreate').value;
        let passwordConfirmCreate = document.getElementById('passwordConfirmCreate').value;

        await createUsers(documentCreate, typeDocumentCreate, usernameCreate, last_nameCreate, emailCreate, telephoneCreate, stateCreate, rolCreate, passwordCreate, passwordConfirmCreate);
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';

        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('submit', 'click', async () => {

            await onCreateUsers();
            window.location.reload();
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
