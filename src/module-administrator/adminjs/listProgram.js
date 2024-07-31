import { pb, formatDate } from "../../../global.js";

let overlayUpdate = document.getElementById("overlay-update");
let overlayCreate = document.getElementById("overlay-create");
let overlayDelete = document.getElementById("overlay-delete");
async function isValid() {
    if (!pb.authStore.isValid) {
        window.location.href = "../../../login";
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


    async function updateProgram(id, name) {
        let result = await pb.collection("program").update(id, {
            name: name,
        });
        console.log(result);
    }

    async function createProgram(name) {
        let result = await pb.collection("program").create({
            name: name,
        });
        console.log(result);
    }

    async function deleteProgram(id) {
        let result = await pb.collection("program").delete(id);
        console.log(result);
    }

    const resultList = await pb.collection("program").getList(1, 50, {});

    for (let i = 0; i < resultList.items.length; i++) {
        let listProgram = resultList.items[i];

        let newRow = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.textContent = listProgram.id;
        newRow.appendChild(idCell);

        let nameCell = document.createElement("td");
        nameCell.textContent = listProgram.name;
        newRow.appendChild(nameCell);

        let createdCell = document.createElement("td");
        const createdFormat = await formatDate(listProgram.created);
        createdCell.textContent = listProgram.created;
        createdCell.innerHTML += "<br>" + "(" + createdFormat + ")";
        newRow.appendChild(createdCell);

        let updateCell = document.createElement("td");
        const updateFormat = await formatDate(listProgram.updated);
        updateCell.textContent = listProgram.updated;
        updateCell.innerHTML += "<br>" + "(" + updateFormat + ")";
        newRow.appendChild(updateCell);
        //update
        let programUpdateBtn = document.createElement("a");
        programUpdateBtn.innerHTML =
            '<img src="/img/edit.png" class="icon a-button">';
        let programUpdateTd = document.createElement("td");

        programUpdateTd.appendChild(programUpdateBtn);
        newRow.appendChild(programUpdateTd);

        programUpdateBtn.onclick = async () => {
            overlayUpdate.style.display = "block";

            let name = document.getElementById("updateProgram");
            name.value = listProgram.name;

            let updateFormBtn = document.getElementById("update-form-btn");
            updateFormBtn.onclick = async () => {
                try {
                await updateProgram(listProgram.id, name.value);
                alert("Program updated successfully");
                window.location.reload();
                }catch(error){
                    alert("Error updating program: " + error);
                }
            };
        };
        //delate
        let programDeleteBtn = document.createElement("a");
        programDeleteBtn.innerHTML =
            '<img src="/img/delate.webp" class="icon a-button">';

        let programDeleteTd = document.createElement("td");
        programDeleteTd.appendChild(programDeleteBtn);
        newRow.appendChild(programDeleteTd);

        programDeleteBtn.onclick = async () => {
            overlayDelete.style.display = "block";
            let deleteFormBtn = document.getElementById("delete-form-btn");
            deleteFormBtn.onclick = async (event) => {
                event.preventDefault();
                try {
                await deleteProgram(listProgram.id);
                alert("Program deleted successfully");
                window.location.reload();
                } catch (e) {
                    alert("Error deleting program: " + e);
                }
            };
        };

        document.querySelector("#listProgram").appendChild(newRow);
    }

    async function onCreateProgram() {
        let name = document.getElementById("createProgram").value;

        await createProgram(name);
    }

    let createBtn = document.getElementById("create-btn");
    createBtn.onclick = async () => {
        overlayCreate.style.display = "block";

        let createForm = document.getElementById("create-form-btn");
        createForm.addEventListener("click", async (event) => {
            event.preventDefault();   
            try {       
            await onCreateProgram();
            alert("Program created successfully");
            window.location.reload();
            } catch (error) {
                alert("Error creating program: " + error);
            }
        });
    };

    let createBtnCancel = document.getElementById("create-form-cancel");
    createBtnCancel.onclick = () => {
        overlayCreate.style.display = "none";
    };
    let updateBtnCancel = document.getElementById("update-form-cancel");
    updateBtnCancel.onclick = () => {
        overlayUpdate.style.display = "none";
    };
    let deleteBtnCancel = document.getElementById("delete-form-cancel");
    deleteBtnCancel.onclick = () => {
        overlayDelete.style.display = "none";
    };
    document.querySelector('#logout-btn').addEventListener('click', async () => {
        pb.authStore.clear();
        window.location.replace("../../../login.html");
      });
}

getUserInfo();
