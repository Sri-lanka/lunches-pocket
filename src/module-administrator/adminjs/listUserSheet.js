import { pb, formatDate } from "../../../global.js";

let overlayUpdate = document.getElementById("overlay-update");
let overlayCreate = document.getElementById("overlay-create");
let overlayDelete = document.getElementById("overlay-delete");

async function getUserInfo() {
  if (!pb.authStore.isValid) {
    window.location.href = "updateUser.html";
    return;
  }
  async function updateUserSheet(id, state) {
    let result = await pb.collection("user_sheet").update(id, {
      state: state,
    });
    console.log(result);
  }

  async function createUserSheet(id_sheet, id_user, state) {
    let result = await pb.collection("user_sheet").create({
      id_sheet: id_sheet,
      id_user: id_user,
      state: state,
    });
    console.log(result);
  }

  async function deleteUserSheet(id) {
    let result = await pb.collection("user_sheet").delete(id);
    console.log(result);
  }
  const resultList = await pb.collection("user_sheet").getList(1, 50, {
    expand: 'id_user, id_sheet'
  });

  for (let i = 0; i < resultList.items.length; i++) {
    let listUserSheet = resultList.items[i];

    let newRow = document.createElement("tr");

    let idCell = document.createElement("td");
    idCell.textContent = listUserSheet.id;
    newRow.appendChild(idCell);

    let id_sheetCell = document.createElement("td");
    id_sheetCell.textContent = listUserSheet.id_sheet;
    id_sheetCell.innerHTML +=  "<br>" + "(#"+ listUserSheet.expand.id_sheet.N_sheet + ")";
    newRow.appendChild(id_sheetCell);

    let id_userCell = document.createElement("td");
    id_userCell.textContent = listUserSheet.id_user;
    id_userCell.innerHTML +=  "<br>" + "("+ listUserSheet.expand.id_user.email + ")";
    newRow.appendChild(id_userCell);

    let stateCell = document.createElement("td");
    stateCell.textContent = listUserSheet.state;
    newRow.appendChild(stateCell);

    let createdCell = document.createElement("td");
    const createdFormat = await formatDate(listUserSheet.created);
    createdCell.textContent = listUserSheet.created;
    createdCell.innerHTML +=  "<br>" + "("+ createdFormat + ")";
    newRow.appendChild(createdCell);

    //update button

    let userSheetUpdateBtn = document.createElement("a");userSheetUpdateBtn.innerHTML =
      '<img src="/img/edit.png" class="icon a-button">';
    let userSheetUpdateTd = document.createElement("td");

    userSheetUpdateTd.appendChild(userSheetUpdateBtn);
    newRow.appendChild(userSheetUpdateTd);

    userSheetUpdateBtn.onclick = async () => {
      overlayUpdate.style.display = "block";

      let updateFormBtn = document.getElementById("update-form-btn");
      updateFormBtn.onclick = async () => {
  
        let verification = document.getElementById("verificationCreate").value;
        await updateUserSheet(listUserSheet.id, verification);
        window.location.reload();
      };
    };
    //delete button
    let userSheetDeleteBtn = document.createElement("a");
    userSheetDeleteBtn.innerHTML =
      '<img src="/img/delate.webp" class="icon a-button">';

    let userSheetDeleteTd = document.createElement("td");
    userSheetDeleteTd.appendChild(userSheetDeleteBtn);
    newRow.appendChild(userSheetDeleteTd);

    userSheetDeleteBtn.onclick = async () => {
      overlayDelete.style.display = "block";
      let deleteFormBtn = document.getElementById("delete-form-btn");
      deleteFormBtn.onclick = async (event) => {
        event.preventDefault();
        await deleteUserSheet(listUserSheet.id);
        window.location.reload();
      };
 
    };

    document.querySelector("#listUserSheet").appendChild(newRow);
  }

  async function onCreateUserSheet() {
    let N_sheet = document.getElementById("characterization_sheet-select").value;
    let user = document.getElementById("user-select").value;
    let verification = document.getElementById("verificationCreate").checked;

    await createUserSheet(N_sheet, user, verification);
    window.location.reload();
  }

  let createBtn = document.getElementById("create-btn");
  createBtn.onclick = async () => {
    overlayCreate.style.display = "block";

    let users = await pb.collection("users").getFullList({
      filter: `rol = "user"`,
    });

    let userSheet = await pb.collection("characterization_sheet").getFullList();

    let userSheetSelect = document.getElementById("characterization_sheet-select");
    userSheetSelect.innerHTML = "";
    userSheet.forEach(userSheet => {
      console.log(userSheet);
      let option = document.createElement("option");
      option.value = userSheet.id;
      option.innerHTML = userSheet.N_sheet;
      console.log(userSheet.N_sheet);
      userSheetSelect.appendChild(option);

    });

    let userSelect = document.getElementById("user-select");
    userSelect.innerHTML = "";
    users.forEach((user) => {
      console.log(user);
      let option = document.createElement("option");
      option.value = user.id;
      option.innerHTML = user.name;
      userSelect.appendChild(option);
    });

    let createForm = document.getElementById("create-form-btn");
    createForm.addEventListener("click", async (event) => {
      event.preventDefault();
      await onCreateUserSheet();
      window.location.reload();
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
}

getUserInfo();
