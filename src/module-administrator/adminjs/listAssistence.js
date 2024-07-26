import { pb,formatDate } from '../../../global.js';

let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');
let overlayDelete = document.getElementById('overlay-delete');
async function isValid() {
    if (!pb.authStore.isValid) {
        window.location.href = "../../../index";
        return;
        
    }
  
    let user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (user.rol != 'admin') {
      window.location.href = "home";
      return;
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




    const resultList = await pb.collection('assistance').getList(1, 50, {
        expand: 'idUser'
    });

    for (let i = 0; i < resultList.items.length; i++) {
        let listAssistance = resultList.items[i];

        let newRow = document.createElement('tr');

        let idCell = document.createElement('td');
        idCell.textContent = listAssistance.id;
        newRow.appendChild(idCell);

        let idUserCell = document.createElement('td');
        idUserCell.textContent = listAssistance.idUser ;
        idUserCell.innerHTML +=  "<br>" + "("+ listAssistance.expand.idUser.email + ")";
        newRow.appendChild(idUserCell);

        let verificationCell = document.createElement('td');
        verificationCell.textContent = listAssistance.verification;
        newRow.appendChild(verificationCell);

        let createdCell = document.createElement('td');
        const createdFormat = await formatDate(listAssistance.created);
        createdCell.textContent = listAssistance.created;
        createdCell.innerHTML +=  "<br>" + "("+ createdFormat + ")";
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
            }

        }

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
            }
           
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
    let deleteBtnCancel = document.getElementById('delete-form-cancel');
    deleteBtnCancel.onclick = () => {
        overlayDelete.style.display = 'none';
    }
    document.querySelector('#logout-btn').addEventListener('click', async () => {
        pb.authStore.clear();
        window.location.replace("../../../index");
      });
}
getUserInfo();