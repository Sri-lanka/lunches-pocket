import { pb, formatDate } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');
let overlayDelete = document.getElementById('overlay-delete');

async function isValid() {
    if (!pb.authStore.isValid) {
        window.location.href = "../../../login";
        return;

    }

    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (user.rol != 'admin') {
        window.location.href = "home";
        return false;
    }
}

isValid();

async function getUserInfo() {

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

    async function fetchAndDisplayAssistance(userDocument = '') {
        
        const resultList = await pb.collection('assistance').getList(1, 50, {
            sort: '-created',
            expand: 'idUser'
        });
    
       
        let filteredResults = resultList.items;
        if (userDocument !== '') {
            filteredResults = resultList.items.filter(item => item.expand.idUser.document == userDocument);
            console.log(filteredResults);
        }
    
        
        document.querySelector('#listAssistence').innerHTML = '';
    
        for (let i = 0; i < filteredResults.length; i++) {
            let listAssistance = filteredResults[i];
    
            let newRow = document.createElement('tr');
    
            let idCell = document.createElement('td');
            idCell.textContent = listAssistance.id;
            newRow.appendChild(idCell);
    
            let idUserCell = document.createElement('td');
            idUserCell.textContent = listAssistance.idUser;
            idUserCell.innerHTML += "<br>" + "(" + listAssistance.expand.idUser.email + ")";
            newRow.appendChild(idUserCell);
    
            let verificationCell = document.createElement('td');
            verificationCell.textContent = listAssistance.verification;
            newRow.appendChild(verificationCell);
    
            let createdCell = document.createElement('td');
            const createdFormat = await formatDate(listAssistance.created);
            createdCell.textContent = createdFormat;
            
            newRow.appendChild(createdCell);
    
            let assistanceUpdateBtn = document.createElement('a');
            assistanceUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
            let assistanceUpdateTd = document.createElement('td');
    
            assistanceUpdateTd.appendChild(assistanceUpdateBtn);
            newRow.appendChild(assistanceUpdateTd);
    
            assistanceUpdateBtn.onclick = async () => {
                overlayUpdate.style.display = 'block';
    
                let verification = document.getElementById('verificationUpdate');
                verification.checked = listAssistance.verification;
    
                let updateFormBtn = document.getElementById('update-form-btn');
                updateFormBtn.onclick = async (event) => {
                    event.preventDefault();
    
                    await updateAssistance(listAssistance.id, verification.checked);
                    window.location.reload();
                };
            };
    
            let assistanceDeleteBtn = document.createElement('a');
            assistanceDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';
            let assistanceDeleteTd = document.createElement('td');
            assistanceDeleteTd.appendChild(assistanceDeleteBtn);
            newRow.appendChild(assistanceDeleteTd);
    
            assistanceDeleteBtn.onclick = async () => {
                overlayDelete.style.display = 'block';
                let deleteFormBtn = document.getElementById('delete-form-btn');
                deleteFormBtn.onclick = async (event) => {
                    event.preventDefault();
                    await deleteAssistance(listAssistance.id);
                    window.location.reload();
                };
            };
    
            document.querySelector('#listAssistence').appendChild(newRow);
        }
    }
    
    
    window.addEventListener('load', () => {
        fetchAndDisplayAssistance();
    });
    
    document.getElementById('filterBtn').addEventListener('click', () => {
        let userDocument = document.getElementById('userDocumentInput').value.trim();
        fetchAndDisplayAssistance(userDocument);
    });

    let applyFilterBtn = document.getElementById('apply-filter-btn');
    let filterInput = document.getElementById('filter-input');
    let userSelectReciepient = document.getElementById('user-select');

    async function updateUserSelect(filter) {
        try {

            let userReciepient = await pb.collection('users').getFullList({
                filter: filter,
            });

            userSelectReciepient.innerHTML = '';
            if (userReciepient.length == 0) {
                alert("No users found");
                let filter = 'rol = "user"';
                updateUserSelect(filter);
                userReciepient.forEach(userReciepient => {
                    console.log(userReciepient);
                    let option = document.createElement('option');
                    option.value = userReciepient.id;
                    option.innerHTML = userReciepient.email;
                    userSelectReciepient.appendChild(option);
                });
            } else {
                alert("Users found: " + " " + userReciepient.length);
                userReciepient.forEach(userReciepient => {
                    console.log(userReciepient);
                    let option = document.createElement('option');
                    option.value = userReciepient.id;
                    option.innerHTML = userReciepient.email;
                    userSelectReciepient.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function onCreateAssistance() {

        let user = document.getElementById('user-select').value;
        let verification = document.getElementById('verificationCreate').checked;
        await createAssistance(user, verification);
        window.location.reload();
    }

    let createBtn = document.getElementById('create-btn');
    createBtn.onclick = async () => {
        overlayCreate.style.display = 'block';

        let filter = 'rol = "user"';
        await updateUserSelect(filter);
        applyFilterBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            let filterValue = filterInput.value;
            let filter = `rol = "user" && document = "${filterValue}"`;
            await updateUserSelect(filter);

        });
        let createForm = document.getElementById('create-form-btn');
        createForm.addEventListener('click', async () => {
            await onCreateAssistance();
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
    let deleteBtnCancel = document.getElementById('delete-form-cancel');
    deleteBtnCancel.onclick = () => {
        overlayDelete.style.display = 'none';
    }

}
getUserInfo();

document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.replace("../../../login.html");
});