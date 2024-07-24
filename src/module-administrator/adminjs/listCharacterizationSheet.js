import { pb } from "../../../global.js";

let overlayUpdate = document.getElementById("overlay-update");
let overlayCreate = document.getElementById("overlay-create");

async function getUserInfo() {
  if (!pb.authStore.isValid) {
    window.location.href = "index.html";
    return;
  }
  async function updateCharacterizationSheet(id, name) {
    let result = await pb.collection("characterization_sheet").update(id, {
      name: name,
    });
    console.log(result);
  }

  async function createCharacterizationSheet(N_sheet, id_program, end) {
    let result = await pb.collection("characterization_sheet").create({
      N_sheet: N_sheet,
      id_program: id_program,
      end: end,
      
    });
    console.log(result);
  }

  async function deleteCharacterizationSheet(id) {
    let result = await pb.collection("characterization_sheet").delete(id);
    console.log(result);
  }

  const resultList = await pb
    .collection("characterization_sheet")
    .getList(1, 50, {});

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
    newRow.appendChild(id_programCell);

    let createdCell = document.createElement("td");
    createdCell.textContent = listCharacterizationSheet.created;
    newRow.appendChild(createdCell);

    let endCell = document.createElement("td");
    endCell.textContent = listCharacterizationSheet.end;
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
    characterizationSheetDeleteBtn.innerHTML =
      '<img src="/img/delate.webp" class="icon a-button">';

    let characterizationSheetDeleteTd = document.createElement("td");
    characterizationSheetDeleteTd.appendChild(characterizationSheetDeleteBtn);
    newRow.appendChild(characterizationSheetDeleteTd);

    characterizationSheetDeleteBtn.onclick = async () => {
      await deleteCharacterizationSheet(listCharacterizationSheet.id);
      window.location.reload();
    };

    document.querySelector("#listCharacterizationSheet").appendChild(newRow);
  }

  async function onCreateCharacterizationSheet() {
    
    let N_sheet = document.getElementById("n°sheetCreate").value;
    let program = document.getElementById("programCreate-select").value;
  
    let endW = document.getElementById("endCreate").value;
    
    await createCharacterizationSheet(N_sheet, program, endW);
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
}

getUserInfo();
