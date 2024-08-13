import { pb, formatDate, convertDTLtoIso, convertIsoToDTL } from "../../../global.js";

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

  async function updateCharacterizationSheet(id, N_sheet, id_program, date_end) {
    let result = await pb.collection("characterization_sheet").update(id, {
      N_sheet: N_sheet,
      id_program: id_program,
      date_end: date_end,
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
  async function fetchAndDisplaySheet(nameProgram = '') {

    const resultList = await pb.collection("characterization_sheet").getList(1, 50, {
      expand: "id_program",
      sort: '-created'
    });


    let filteredResults = resultList.items;
    if (nameProgram !== '') {
      filteredResults = resultList.items.filter(item =>
         item.expand.id_program.name.toLowerCase() == nameProgram.toLowerCase());
      console.log(filteredResults);
    }


    document.querySelector('#listCharacterizationSheet').innerHTML = '';


    for (let i = 0; i < filteredResults.length; i++) {
      let listCharacterizationSheet = filteredResults[i];

      let newRow = document.createElement("tr");

      let idCell = document.createElement("td");
      idCell.textContent = listCharacterizationSheet.id;
      newRow.appendChild(idCell);

      let N_sheetCell = document.createElement("td");
      N_sheetCell.textContent = listCharacterizationSheet.N_sheet;
      newRow.appendChild(N_sheetCell);

      let id_programCell = document.createElement("td");
      id_programCell.textContent = listCharacterizationSheet.id_program;
      id_programCell.innerHTML +=
        "<br>" + "(" + listCharacterizationSheet.expand.id_program.name + ")";
      newRow.appendChild(id_programCell);

      let createdCell = document.createElement("td");
      const createdFormat = await formatDate(listCharacterizationSheet.created);
      createdCell.textContent = createdFormat;

      newRow.appendChild(createdCell);

      let endCell = document.createElement("td");
      const endFormat = await formatDate(listCharacterizationSheet.date_end);
      endCell.textContent = endFormat;

      newRow.appendChild(endCell);

      //update

      let characterizationSheetUpdateBtn = document.createElement("a");
      characterizationSheetUpdateBtn.innerHTML =
        '<img src="/img/edit.png" class="icon a-button">';
      let characterizationSheetUpdateTd = document.createElement("td");

      characterizationSheetUpdateTd.appendChild(characterizationSheetUpdateBtn);
      newRow.appendChild(characterizationSheetUpdateTd);

      characterizationSheetUpdateBtn.onclick = async () => {
        async function updateUserSelectUpdate(filter) {
          try {
            let programSelect = document.getElementById("programUpdate-select");

            let program = await pb.collection("program").getFullList({
              filter: filter,
            });

            programSelect.innerHTML = '';
            if (program.length == 0) {
              alert("No programs found");
              let filter = '';
              updateUserSelect(filter);
              program.forEach((program) => {
                console.log(program);
                let option = document.createElement("option");
                option.value = program.id;
                option.innerHTML = program.name;
                console.log(program.name);
                programSelect.appendChild(option);
              });
            } else {
             
              program.forEach((program) => {
                console.log(program);
                let option = document.createElement("option");
                option.value = program.id;
                option.innerHTML = program.name;
                console.log(program.name);
                programSelect.appendChild(option);
              });
            }
            programSelect.value = listCharacterizationSheet.id_program;
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        }
        let applyFilterBtn = document.getElementById('apply-filter-btn-update');
        let filterInput = document.getElementById('filter-input-update');

        overlayUpdate.style.display = "block";
        let filter = '';
        await updateUserSelectUpdate(filter);

        let n_sheetUpdate = document.getElementById("n_sheetUpdate");
        n_sheetUpdate.value = listCharacterizationSheet.N_sheet;


        programSelect.value = listCharacterizationSheet.id_program;

        let date_endUpdate = document.getElementById("date_endUpdate");
        date_endUpdate.value = await convertIsoToDTL(listCharacterizationSheet.date_end);

        applyFilterBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          let filterValue = filterInput.value;
          let filter = `name = "${filterValue}"`;
          await updateUserSelectUpdate(filter);

        });


        let updateFormBtn = document.getElementById("update-form-btn");
        updateFormBtn.onclick = async (event) => {
          let date_endValue = await convertDTLtoIso(date_endUpdate.value);
          event.preventDefault();
          console.log(date_endValue);
          console.log(listCharacterizationSheet.date_end);
          await updateCharacterizationSheet(
            listCharacterizationSheet.id,
            n_sheetUpdate.value,
            programSelect.value,
            date_endValue
          );
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
  }
  window.addEventListener('load', () => {
    fetchAndDisplaySheet();
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    let nameProgram = document.getElementById('nameProgramInput').value.trim();
    fetchAndDisplaySheet(nameProgram);
  });

  let applyFilterBtn = document.getElementById('apply-filter-btn');
  let filterInput = document.getElementById('filter-input');
  let programSelect = document.getElementById("programCreate-select");

  async function onCreateCharacterizationSheet() {
    let N_sheet = document.getElementById("n°sheetCreate").value;
    let program = document.getElementById("programCreate-select").value;
    let date_end = document.getElementById("date_endCreate");
    date_end = await convertDTLtoIso(date_end.value);

    await createCharacterizationSheet(N_sheet, program, date_end);
    window.location.reload();
  }
  async function updateUserSelect(filter) {
    try {

      let program = await pb.collection("program").getFullList({
        filter: filter,
      });

      programSelect.innerHTML = '';
      if (program.length == 0) {
        alert("No programs found");
        let filter = '';
        updateUserSelect(filter);
        program.forEach((program) => {
          console.log(program);
          let option = document.createElement("option");
          option.value = program.id;
          option.innerHTML = program.name;
          console.log(program.name);
          programSelect.appendChild(option);
        });
      } else {
      
        program.forEach((program) => {
          console.log(program);
          let option = document.createElement("option");
          option.value = program.id;
          option.innerHTML = program.name;
          console.log(program.name);
          programSelect.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  }

  let createBtn = document.getElementById("create-btn");
  createBtn.onclick = async () => {
    overlayCreate.style.display = "block";


    let filter = '';
    await updateUserSelect(filter);
    applyFilterBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      let filterValue = filterInput.value;
      let filter = `name ~  "${filterValue}"`;
      await updateUserSelect(filter);
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
