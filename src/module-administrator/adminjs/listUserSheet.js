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

  async function fetchAndDisplayUserSheet(userDocument = '') {

    const resultList = await pb.collection("user_sheet").getList(1, 50, {
      expand: 'id_user, id_sheet'
    });

    let dataSelector = document.getElementById('dataFilter').value;
    let filteredResults = resultList.items;



    if (userDocument !== '' && dataSelector == '2') {
      filteredResults = resultList.items.filter(item => {
        if (item.expand && item.expand.id_sheet) {
          return item.expand.id_sheet.N_sheet == userDocument;
        } else {
          return false;
        }
      });
    } else if (userDocument !== '' && dataSelector == '3') {
      filteredResults = resultList.items.filter(item => {
        if (item.expand && item.expand.id_user) {
          return item.expand.id_user.document == userDocument;
        } else {
          return false;
        }
      });
    } else if (dataSelector == '1') {

    }



    document.querySelector('#listUserSheet').innerHTML = '';

    for (let i = 0; i < filteredResults.length; i++) {
      let listUserSheet = filteredResults[i];

      let newRow = document.createElement("tr");

      let idCell = document.createElement("td");
      idCell.textContent = listUserSheet.id;
      newRow.appendChild(idCell);

      let id_sheetCell = document.createElement("td");
      id_sheetCell.textContent = listUserSheet.id_sheet;
      id_sheetCell.innerHTML += "<br>" + "(#" + listUserSheet.expand.id_sheet.N_sheet + ")";
      newRow.appendChild(id_sheetCell);

      let id_userCell = document.createElement("td");
      id_userCell.textContent = listUserSheet.id_user;
      id_userCell.innerHTML += "<br>" + "(" + listUserSheet.expand.id_user.email + ")";
      newRow.appendChild(id_userCell);

      let stateCell = document.createElement("td");
      stateCell.textContent = listUserSheet.state;
      newRow.appendChild(stateCell);

      let createdCell = document.createElement("td");
      const createdFormat = await formatDate(listUserSheet.created);
      createdCell.textContent = listUserSheet.created;
      createdCell.innerHTML += "<br>" + "(" + createdFormat + ")";
      newRow.appendChild(createdCell);

      //update button

      let userSheetUpdateBtn = document.createElement("a"); userSheetUpdateBtn.innerHTML =
        '<img src="/img/edit.png" class="icon a-button">';
      let userSheetUpdateTd = document.createElement("td");

      userSheetUpdateTd.appendChild(userSheetUpdateBtn);
      newRow.appendChild(userSheetUpdateTd);

      userSheetUpdateBtn.onclick = async () => {
        overlayUpdate.style.display = "block";

        let updateFormBtn = document.getElementById("update-form-btn");
        updateFormBtn.onclick = async () => {

          let verification = document.getElementById("verificationCreate").value;
          try {
            await updateUserSheet(listUserSheet.id, verification);
            alert("Updated user sheet successfully");
            window.location.reload();
          } catch (error) {
            alert("Error updating user sheet: " + error);
          }
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
          try {
            await deleteUserSheet(listUserSheet.id);
            alert("Deleted user sheet successfully");
            window.location.reload();
          } catch (error) {
            alert("Error deleting user sheet: " + error);
          }
        };

      };

      document.querySelector("#listUserSheet").appendChild(newRow);
    }
  }
  window.addEventListener('load', () => {
    fetchAndDisplayUserSheet();
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    let userDocument = document.getElementById('userDocumentInput').value.trim();
    fetchAndDisplayUserSheet(userDocument);
  });

  async function updateUserSelect(filter) {
    try {

      let userSelectSender = document.getElementById('user-select');

      let userSender = await pb.collection('users').getFullList({
        filter: filter,
      }
      );

      userSelectSender.innerHTML = '';
      if (userSender.length == 0) {
        alert("No users found");
        let filter = "";
        updateUserSelect(filter);
        userSender.forEach(userSender => {
          console.log(userSender);
          let option = document.createElement('option');
          option.value = userSender.id;
          option.innerHTML = userSender.email;
          userSelectSender.appendChild(option);
        });
      } else {
        alert("Users found: " + " " + userSender.length);
        userSender.forEach(userSender => {
          console.log(userSender);
          let option = document.createElement('option');
          option.value = userSender.id;
          option.innerHTML = userSender.email;
          userSelectSender.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function updateSheetSelect(filter) {
    try {

      let sheetSelect = document.getElementById('characterization_sheet-select');

      let sheet = await pb.collection('characterization_sheet').getFullList({
        filter: filter,
      }
      );

      sheetSelect.innerHTML = '';
      if (sheet.length == 0) {
        alert("No sheets found");
        let filter = "";
        updateUserSelect(filter);
        sheet.forEach(sheet => {
          console.log(sheet);
          let option = document.createElement('option');
          option.value = sheet.id;
          option.innerHTML = sheet.N_sheet;
          sheetSelect.appendChild(option);
        });
      } else {
        alert("sheets found: " + " " + sheet.length);
        sheet.forEach(sheet => {
          console.log(sheet);
          let option = document.createElement('option');
          option.value = sheet.id;
          option.innerHTML = sheet.N_sheet;
          sheetSelect.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error fetching sheets:', error);
    }
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
    let applyFilterBtn = document.getElementById('apply-filter-btn');
    let filterInput = document.getElementById('filter-input');

    /*let users = await pb.collection("users").getFullList({
      filter: `rol = "user"`,
    });
    let userSelect = document.getElementById("user-select");
    userSelect.innerHTML = "";
    users.forEach((user) => {
      console.log(user);
      let option = document.createElement("option");
      option.value = user.id;
      option.innerHTML = user.name;
      userSelect.appendChild(option);
    });*/
    let filter = 'rol = "user"';
    await updateUserSelect(filter);

    /*let userSheet = await pb.collection("characterization_sheet").getFullList();
  
    let userSheetSelect = document.getElementById("characterization_sheet-select");
    userSheetSelect.innerHTML = "";
    userSheet.forEach(userSheet => {
      console.log(userSheet);
      let option = document.createElement("option");
      option.value = userSheet.id;
      option.innerHTML = userSheet.N_sheet;
      console.log(userSheet.N_sheet);
      userSheetSelect.appendChild(option);

    });*/
    let filterSheet = '';
    await updateSheetSelect(filterSheet);

    applyFilterBtn.addEventListener('click', async (e) => {
      let filterSelect = document.getElementById('filterSelect').value;
      e.preventDefault();
      if (filterSelect == 'user') {
          let filterValue = filterInput.value;
          let filter = `rol = "user" && document = "${filterValue}"`;
          await updateUserSelect(filter);
      } else if (filterSelect == 'sheet') {
          let filterValue = filterInput.value;
          let filter = `N_sheet = "${filterValue}"`;
          await updateSheetSelect(filter);
      } else {
          let filterUser = 'rol = "user"';
          let filterSheet = "";
          await updateSheetSelect(filterSheet);
          await updateUserSelect(filterUser);
      }
      
  });


 

    let createForm = document.getElementById("create-form-btn");
    createForm.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await onCreateUserSheet();
        window.location.reload();
      } catch (error) {
        alert("Error creating user sheet: " + error);
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
