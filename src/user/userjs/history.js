import { pb } from '../../../global.js';

async function getUserInfo() {
  if (!pb.authStore.isValid) {
    window.location.href = "history.html";
    return;
  }

  let user = await pb.collection('users').getOne(pb.authStore.model.id);
  const result = await pb.collection('sheet_user').getList(1, 50, {
    filter: `username = "${user.username}"`,
  });

  let listData = result.items[0];
  console.log(listData);

  let userSheetElement = document.querySelector('#user-info');
  userSheetElement.innerHTML = '<li> ' + listData.username + '</li>';
  userSheetElement.innerHTML += '<li> ' + listData.last_name + '</li>';
  userSheetElement.innerHTML += '<li>Sheet: ' + listData.N_sheet + '</li>';
  userSheetElement.innerHTML += '<li>state: ' + listData.state + '</li>';

  const resultReports = await pb.collection('message_user_report').getList(1, 50, {
    filter: `Recipient = "${user.id}"`,
  });

  for (let i = 0; i < resultReports.items.length; i++) {
    let listReports = resultReports.items[i];


    let newRow = document.createElement('tr');

    let senderCell = document.createElement('td');
    senderCell.textContent = listReports.sender;
    newRow.appendChild(senderCell);

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = listReports.description;
    newRow.appendChild(descriptionCell);

    let createdReport = document.createElement('td');
    createdReport.textContent = listReports.created;
    newRow.appendChild(createdReport);

    document.querySelector('#reportHistory').appendChild(newRow);
  }


  const resultExcuses = await pb.collection('message_user').getList(1, 50, {
    filter: `idUser = "${user.id}"`,
  });


  for (let i = 0; i < resultExcuses.items.length; i++) {
    let listExcuses = resultExcuses.items[i];

    let newRow = document.createElement('tr');

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = listExcuses.description;
    newRow.appendChild(descriptionCell);

    let createdCell = document.createElement('td');
    createdCell.textContent = listExcuses.created;
    newRow.appendChild(createdCell);

    document.querySelector('#excuseHistory').appendChild(newRow);
  }

  const resultAssistance = await pb.collection('user_assistance').getList(1, 50, {
    filter: `idUser = "${user.id}"`,
  });
  for (let i = 0; i < resultAssistance.items.length; i++) {
    let listAssistances = resultAssistance.items[i];

    let newRow = document.createElement('tr');

    let createdCell = document.createElement('td');
    createdCell.textContent = listAssistances.created;
    newRow.appendChild(createdCell);

    let verificationCell = document.createElement('td');
    verificationCell.textContent = listAssistances.verification;
    newRow.appendChild(verificationCell);

    document.querySelector('#assistanceHistory').appendChild(newRow);
  }


}

getUserInfo();

document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("history");
  var tableReport = document.getElementById("tableReport");
  var tableExcuse = document.getElementById("tableExcuse");
  var tableAssistance = document.getElementById("tableAssistance")

  select.addEventListener("change", function () {
    if (select.value === "1") {
      tableReport.style.display = "table";
      tableExcuse.style.display = "none";
      tableAssistance.style.display = "none";
    } else if (select.value === "2") {
      tableReport.style.display = "none";
      tableExcuse.style.display = "table";
      tableAssistance.style.display = "none";
    } else if (select.value === "3") {
      tableReport.style.display = "none";
      tableExcuse.style.display = "none";
      tableAssistance.style.display = "table";
    } else {
      tableReport.style.display = "none";
      tableExcuse.style.display = "none";
      tableAssistance.style.display = "none";
    }
  });

  // Llamar a la función inicialmente para establecer el estado inicial
  mostrarTabla();
});

function mostrarTabla() {
  var select = document.getElementById("history");
  var tableReport = document.getElementById("tableReport");
  var tableExcuse = document.getElementById("tableExcuse");

  if (select.value === "1") {
    tableReport.style.display = "table";
    tableExcuse.style.display = "none";
  } else if (select.value === "2") {
    tableReport.style.display = "none";
    tableExcuse.style.display = "table";
  } else {
    tableReport.style.display = "none";
    tableExcuse.style.display = "none";
  }
}

document.querySelector('#logout-btn').addEventListener('click', async () => {
  pb.authStore.clear();
  window.location.replace("../../../index");
});

document.querySelector('#home-btn').addEventListener('click', async () => {
  window.location.href = "home";
});
document.querySelector('#data-btn').addEventListener('click', async () => {
  window.location.href = "data";
});
document.querySelector('#history-btn').addEventListener('click', async () => {
  window.location.href = "history";
});