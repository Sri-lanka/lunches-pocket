import { pb } from '../../../global.js';
/*
let overlayUpdate = document.getElementById('overlay-update');
let overlayCreate = document.getElementById('overlay-create');
*/
async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "updateUser.html";
        return;
    }
  /*  async function updateUser(id, email, telephone) {
        let result = await pb.collection('users').update(id, email, telephone, {
            email: email,
            telephone: telephone,
        });
        console.log(result);
    }*/

   /* async function createUsers(id) {
        let result = await pb.collection('users').create({
            document: document,
            typeDocument: typeDocument,
            username: username,
            last_name: last_name,
            email: email,
            telephone: telephone,
            state: state,
            rol: rol,
            Password: password
        });
        console.log(result);
    }*/

        const resultList = await pb.collection('users').getList(1, 50, {
        });
        console.log(resultList);
        for (let i = 0; i < resultList.items.length; i++) {
            let listUser = resultList.items[i];
            console.log(listUser);
            let newRow = document.createElement('tr');
            let idCell = document.createElement('td');
            idCell.textContent = listUser.id;
            newRow.appendChild(idCell);
            let documentCell = document.createElement('td');
            documentCell.textContent = listUser.document;
            newRow.appendChild(documentCell);
            let typeDocumentCell = document.createElement('td');
            typeDocumentCell.textContent = listUser.typeDocument;
            newRow.appendChild(typeDocumentCell);
            let nameCell = document.createElement('td');
            nameCell.textContent = listUser.username;
            newRow.appendChild(nameCell);
            let lastNameCell = document.createElement('td');
            lastNameCell.textContent = listUser.last_name;
            newRow.appendChild(lastNameCell);
            let emailCell = document.createElement('td');
            emailCell.textContent = listUser.email;
            newRow.appendChild(emailCell);
            let telephoneCell = document.createElement('td');
            telephoneCell.textContent = listUser.telephone;
            newRow.appendChild(telephoneCell);
            let stateCell = document.createElement('td');
            stateCell.textContent = listUser.state;
            newRow.appendChild(stateCell);
            let rolCell = document.createElement('td');
            rolCell.textContent = listUser.rol;
            newRow.appendChild(rolCell);
            document.querySelector('#listUsers').appendChild(newRow);
           /* 
            let updateTd = document.createElement('td');
            let updateBtn = document.createElement('button');
            updateBtn.innerHTML = 'Update';
            
            updateBtn.onclick = async () => {
                overlayUpdate.style.display = 'block';
            
                let updateFormBtn = document.getElementById('update-form-btn');
                updateFormBtn.addEventListener = "sumbit", async (event) => {
                    event.preventDefault();
                    await updateUser(listUser.id, listUser.email, listUser.telephone);
                    window.location.reload();
                }
            }
            updateTd.appendChild(updateBtn);
            newRow.appendChild(updateTd);*/
        }
}

getUserInfo();