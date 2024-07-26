import { pb, formatDate, convertDTLtoIso } from "../../../global.js";

let overlayUpdate = document.getElementById("overlay-update");
let overlayCreate = document.getElementById("overlay-create");
let overlayDelete = document.getElementById("overlay-delete");
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

  async function updateCharacterizationSheet(id, name) {
    let result = await pb.collection("characterization_sheet").update(id, {
      name: name,
    });
    console.log(result);
  }

  async function createCharacterizationSheet(N_sheet, id_program, date_end) {
    let result = await pb.collection("characterization_sheet").create({
      N_sheet: N_sheet,
      id_program: id_program,
      date_end: date_end,
      
    });
    console.log(result);
  }

  async function deleteCharacterizationSheet(id) {
    let result = await pb.collection("characterization_sheet").delete(id);
    console.log(result);
  }

  const resultList = await pb.collection("characterization_sheet").getList(1, 50, {
    expand: 'id_program'
  });

  for (let i = 0; i < resultList.items.length; i++) {
    let listCharacterizationSheet = resultList.items[i];

    let newRow = document.createElement("tr");

    let idCell = document.createElement("td");
    idCell.textContent = listCharacterizationSheet.id;
    newRow.appendChild(idCell);

    let N_sheetCell = document.createElement("td");
    N_sheetCell.textContent = listCharacterizationSheet.N_sheet;
    newRow.appendChild(N_sheetCell);

    let id_programCell = document.createElement("td");
    id_programCell.textContent = listCharacterizationSheet.id_program;
    id_programCell.innerHTML +=  "<br>" + "("+ listCharacterizationSheet.expand.id_program.name + ")";
    newRow.appendChild(id_programCell);

    let createdCell = document.createElement("td");
    const createdFormat = await formatDate(listCharacterizationSheet.created);
    createdCell.textContent = listCharacterizationSheet.created;
    createdCell.innerHTML +=  "<br>" + "("+ createdFormat + ")";
    newRow.appendChild(createdCell);

    let endCell = document.createElement("td");
    const endFormat = await formatDate(listCharacterizationSheet.date_end);
    endCell.textContent = listCharacterizationSheet.date_end;
    endCell.innerHTML +=  "<br>" + "("+ endFormat + ")";
    newRow.appendChild(endCell);

    let programUpdateBtn = document.createElement("a");
    programUpdateBtn.innerHTML =
      '<img src="/img/edit.png" class="icon a-button">';
    let programUpdateTd = document.createElement("td");

    programUpdateTd.appendChild(programUpdateBtn);
    newRow.appendChild(programUpdateTd);

    programUpdateBtn.onclick = async () => {
      overlayUpdate.style.display = "block";

      let updateFormBtn = document.getElementById("update-form-btn");
      updateFormBtn.onclick = async (
      ) => {
        let name = document.getElementById("updateCharacterizationSheet").value;

        await updateCharacterizationSheet(listProgram.id, name);
        window.location.reload();
      };
    };
    //delete button
    let characterizationSheetDeleteBtn = document.createElement("a");
    characterizationSheetDeleteBtn.innerHTML = '<img src="/img/delate.webp" class="icon a-button">';
    let characterizationSheetDeleteTd = document.createElement("td");
    characterizationSheetDeleteTd.appendChild(characterizationSheetDeleteBtn);
    newRow.appendChild(characterizationSheetDeleteTd);

    characterizationSheetDeleteBtn.onclick = async () => {
      overlayDelete.style.display = "block";
      let deleteFormBtn = document.getElementById("delete-form-btn");
      deleteFormBtn.onclick = async (event) => {
        event.preventDefault();
        await deleteCharacterizationSheet(listCharacterizationSheet.id);
        window.location.reload();
      };
   
    };

    document.querySelector("#listCharacterizationSheet").appendChild(newRow);
  }

  async function onCreateCharacterizationSheet() {
    
    let N_sheet = document.getElementById("n°sheetCreate").value;
    let program = document.getElementById("programCreate-select").value;
    let date_end = document.getElementById("date_endCreate");
    date_end = await convertDTLtoIso(date_end.value);
 
    await createCharacterizationSheet(N_sheet, program, date_end);
    window.location.reload();
  }

  let createBtn = document.getElementById("create-btn");
  createBtn.onclick = async () => {
    overlayCreate.style.display = "block";

    let program = await pb.collection("program").getFullList();

    let programSelect = document.getElementById("programCreate-select");
    programSelect.innerHTML = "";
    program.forEach((program) => {
      console.log(program);
      let option = document.createElement("option");
      option.value = program.id;
      option.innerHTML = program.name;
      console.log(program.name);
      programSelect.appendChild(option);
    });

    let createForm = document.getElementById("create-form-btn");
    createForm.addEventListener("click", async (event) => {
      event.preventDefault();
      await onCreateCharacterizationSheet();
      window.reload();
    });
  };

  let createBtnCancel = document.getElementById("create-form-cancel");
  createBtnCancel.onclick = () => {
    overlayCreate.style.display = "none";
  };

  /*let updateBtnCancel = document.getElementById("update-form-cancel");
  updateBtnCancel.onclick = () => {
    overlaypdate.style.display = "none";
  };*/
  let deleteBtnCancel = document.getElementById("delete-form-cancel");
  deleteBtnCancel.onclick = () => {
    overlayDelete.style.display = "none";
  };

  document.querySelector('#logout-btn').addEventListener('click', async () => {
    pb.authStore.clear();
    window.location.replace("../../../index");
  });
}

getUserInfo();
