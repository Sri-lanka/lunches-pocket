
import { pb } from '../../../global.js';

let overlayUpdate = document.getElementById("overlay-update");
let overlayCreate = document.getElementById("overlay-create");

async function getUserInfo() {
    if (!pb.authStore.isValid) {
        window.location.href = "index.html";
        return;
    }
    async function updateCharacterizationSheet(id, name) {
        let result = await pb.collection("characterizatio_sheet").update(id, {
            name: name,
        });
        console.log(result);
    }

    async function createCharacterizationSheet(name) {
        let result = await pb.collection("characterizatio_sheet").create({
            name: name,
        });
        console.log(result);
    }

    async function deleteCharacterizationSheet(id) {
        let result = await pb.collection("characterizatio_sheet").delete(id);
        console.log(result);
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

            let programUpdateBtn = document.createElement("a");
            programUpdateBtn.innerHTML = '<img src="/img/edit.png" class="icon a-button">';
            let programUpdateTd = document.createElement("td");
    
            programUpdateTd.appendChild(programUpdateBtn);
            newRow.appendChild(programUpdateTd);
    
            programUpdateBtn.onclick = async () => {
                overlayUpdate.style.display = "block";
    
                let updateFormBtn = document.getElementById("update-form-btn");
                updateFormBtn.onclick = async (event) => {
    
                    let name = document.getElementById("updateCharacterizationSheet").value;
    
                    await updateCharacterizationSheet(listProgram.id, name);
                    window.location.reload();
                };
            };


            document.querySelector('#listCharacterizationSheet').appendChild(newRow);


    }

}

getUserInfo();