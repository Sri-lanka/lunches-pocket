import { pb, formatDate } from '../../../global.js';


let overlayShowMessage = document.getElementById('overlay-show-message');
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
    expand: 'idUser,Recipient',
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
    let createdFormat = await formatDate(listReports.created);
    createdReport.textContent = createdFormat;
    newRow.appendChild(createdReport);

    let showTd = document.createElement('td');
    let showBtn = document.createElement('a');
    showBtn.innerHTML = '<img src="/img/eye.png" class="icon-table a-button">';
    showTd.appendChild(showBtn);
    newRow.appendChild(showTd);
    showBtn.addEventListener('click', async () => {


      const cardContainer = document.getElementById('cardContainer');

      cardContainer.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'card';

      const senderElement = document.createElement('h3');
      senderElement.textContent = listReports.expand.idUser.email;
      card.appendChild(senderElement);

      const div = document.createElement('hr');
      card.appendChild(div);

      const typeMessageElement = document.createElement('p');
      typeMessageElement.textContent = "Message";
      card.appendChild(typeMessageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'description';
      descriptionElement.textContent = listReports.description;
      card.appendChild(descriptionElement);

      const div1 = document.createElement('hr');
      card.appendChild(div1)

      if (listReports.field) {
        const nameFile = document.createElement('p');
        nameFile.textContent = listReports.field;
        card.appendChild(nameFile);
        const attachmentElement = document.createElement('a');
        attachmentElement.className = 'attachment';
        attachmentElement.href = `${pb.baseUrl}/api/files/${listReports.collectionId}/${listReports.id}/${listReports.field}`;
        attachmentElement.textContent = 'show file';
        attachmentElement.target = '_blank';
        card.appendChild(attachmentElement);
      } else {
        const attachmentElement = document.createElement('p');
        attachmentElement.textContent = 'NO FILE ATTACHED';
        card.appendChild(attachmentElement);
      }

      const div2 = document.createElement('hr');
      card.appendChild(div2);


      const RecipientElement = document.createElement('p');
      RecipientElement.textContent = "Recipient : You";
      card.appendChild(RecipientElement);

      const createdElement = document.createElement('p');
      const createdFormat = await formatDate(listReports.created);

      createdElement.innerHTML += createdFormat;
      card.appendChild(createdElement);



      const closeElement = document.createElement('button');
      closeElement.innerHTML = 'close';
      closeElement.onclick = () => {
        overlayShowMessage.style.display = 'none';
      }

      card.appendChild(closeElement);


      cardContainer.appendChild(card);

      overlayShowMessage.style.display = 'block';
    });

    document.querySelector('#reportHistory').appendChild(newRow);
  }


  const resultExcuses = await pb.collection('message_user').getList(1, 50, {
    filter: `idUser = "${user.id}"`,
    expand: 'idUser,Recipient',
  });


  for (let i = 0; i < resultExcuses.items.length; i++) {
    let listExcuses = resultExcuses.items[i];

    let newRow = document.createElement('tr');

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = listExcuses.description;
    newRow.appendChild(descriptionCell);

    let stateCell = document.createElement('td');
    if (listExcuses.approved == 'Yes') {
      stateCell.textContent = "Approved";
    } else if (listExcuses.approved == 'No') {
      stateCell.textContent = "Rejected";
    } else {
      stateCell.textContent = "Pending";
    }

    newRow.appendChild(stateCell);

    let createdCell = document.createElement('td');
    let createdFormat = await formatDate(listExcuses.created);
    createdCell.textContent = createdFormat;
    newRow.appendChild(createdCell);
    let showTd = document.createElement('td');
    let showBtn = document.createElement('a');
    showBtn.innerHTML = '<img src="/img/eye.png" class="icon-table a-button">';
    showTd.appendChild(showBtn);
    newRow.appendChild(showTd);
    showBtn.addEventListener('click', async () => {


      const cardContainer = document.getElementById('cardContainer');

      cardContainer.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'card';

      const senderElement = document.createElement('h3');
      senderElement.textContent = listExcuses.expand.idUser.email;
      card.appendChild(senderElement);

      const div = document.createElement('hr');
      card.appendChild(div);

      const typeMessageElement = document.createElement('p');
      typeMessageElement.textContent = "Message";
      card.appendChild(typeMessageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'description';
      descriptionElement.textContent = listExcuses.description;
      card.appendChild(descriptionElement);

      const div1 = document.createElement('hr');
      card.appendChild(div1)

      if (listExcuses.field) {
        const nameFile = document.createElement('p');
        nameFile.textContent = listExcuses.field;
        card.appendChild(nameFile);
        const attachmentElement = document.createElement('a');
        attachmentElement.className = 'attachment';
        attachmentElement.href = `${pb.baseUrl}/api/files/${listExcuses.collectionId}/${listExcuses.id}/${listExcuses.field}`;
        attachmentElement.textContent = 'show file';
        attachmentElement.target = '_blank';
        card.appendChild(attachmentElement);
      } else {
        const attachmentElement = document.createElement('p');
        attachmentElement.textContent = 'NO FILE ATTACHED';
        card.appendChild(attachmentElement);
      }

      const div2 = document.createElement('hr');
      card.appendChild(div2);


      const RecipientElement = document.createElement('p');
      RecipientElement.textContent = "Recipient : All adminstrators";
      card.appendChild(RecipientElement);

      const stateElement = document.createElement('p');
      if (listExcuses.approved == "Yes") {
        stateElement.textContent = "State : Approved";
      } else if (listExcuses.approved == "No") {
        stateElement.textContent = "State : Rejected";
      } else {
        stateElement.textContent = "State : Pending";
      }

      card.appendChild(stateElement);

      const createdElement = document.createElement('p');
      const createdFormat = await formatDate(listExcuses.created);

      createdElement.innerHTML += createdFormat;
      card.appendChild(createdElement);



      const closeElement = document.createElement('button');
      closeElement.innerHTML = 'close';
      closeElement.onclick = () => {
        overlayShowMessage.style.display = 'none';
      }

      card.appendChild(closeElement);


      cardContainer.appendChild(card);

      overlayShowMessage.style.display = 'block';
    });



    document.querySelector('#excuseHistory').appendChild(newRow);
  }

  const resultAssistance = await pb.collection('user_assistance').getList(1, 50, {
    filter: `idUser = "${user.id}"`,
  });
  for (let i = 0; i < resultAssistance.items.length; i++) {

    let listAssistances = resultAssistance.items[i];
    console.log(listAssistances);

    let newRow = document.createElement('tr');

    let createdCell = document.createElement('td');
    let createdFormat = await formatDate(listAssistances.created);
    createdCell.textContent = createdFormat;

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




});



document.querySelector('#logout-btn').addEventListener('click', async () => {
  pb.authStore.clear();
  window.location.replace("../../../login.html");
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