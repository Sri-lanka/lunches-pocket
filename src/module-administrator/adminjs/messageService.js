import { pb, formatDate } from '../../../global.js';
async function isValid() {
  if (!pb.authStore.isValid) {
    window.location.href = "../../../index";
    return;

  }

  let user = await pb.collection('users').getOne(pb.authStore.model.id);
  if (user.rol != 'admin') {
    window.location.href = "home";
    return false;
  }
}

isValid();

let overlayShowMessage = document.querySelector('#overlay-show-message');
let overlayCreate = document.getElementById('overlay-create');
async function getUserInfo() {

  async function createMessage(idUser, type_message, description, field, Recipient) {
    let result = await pb.collection('message').create({
      idUser: idUser,
      type_message: type_message,
      description: description,
      field: field,
      Recipient: Recipient,
    });
    console.log(result);
  }

  let userData = await pb.collection('users').getOne(pb.authStore.model.id);

  let userInfo = document.querySelector('#user-info');
  userInfo.innerHTML = '<li> ' + userData.name + '</li>';
  userInfo.innerHTML += '<li> ' + userData.last_name + '</li>';
  userInfo.innerHTML += '<li> ' + userData.email + '</li>';

  // your reports
  const listYourReports = await pb.collection('message_user_report').getList(1, 50, {
    filter: `idUser = "${userData.id}"`,
    expand: 'Recipient, idUser',
  });
  for (let i = 0; i < listYourReports.items.length; i++) {
    let listReports = listYourReports.items[i];

    let newRow = document.createElement('tr');

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = listReports.description;
    newRow.appendChild(descriptionCell);

    let RecipientCell = document.createElement('td');
    RecipientCell.textContent = listReports.Recipient;
    RecipientCell.innerHTML += "<br>" + "(" + listReports.expand.Recipient.email + ")";
    newRow.appendChild(RecipientCell);

    let dateCell = document.createElement('td');
    let dateFormat = await formatDate(listReports.created);
    dateCell.textContent = dateFormat;
    newRow.appendChild(dateCell);

    let showTd = document.createElement('td');
    let showBtn = document.createElement('a');
    showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
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
      typeMessageElement.textContent = "Report";
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
      RecipientElement.textContent = "Recipient :";
      RecipientElement.innerHTML += listReports.Recipient +" (" + listReports.expand.Recipient.email + ")";
      card.appendChild(RecipientElement);

      const createdElement = document.createElement('p');
      const createdFormat = await formatDate(listReports.created);
      createdElement.textContent = listReports.created;
      createdElement.innerHTML += "<br>" + "(" + createdFormat + ")";
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

    document.querySelector('#yourReportHistory').appendChild(newRow);
  }

  // Reports
  const listReports = await pb.collection('message_user_report').getList(1, 50, {
    sort: '-created',
    expand: 'Recipient, idUser',
  });

  for (let i = 0; i < listReports.items.length; i++) {
    let reports = listReports.items[i];

    let newRow = document.createElement('tr');

    let senderCell = document.createElement('td');
    senderCell.textContent = reports.sender;
    newRow.appendChild(senderCell);

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = reports.description;
    newRow.appendChild(descriptionCell);

    let RecipientCell = document.createElement('td');
    RecipientCell.textContent = reports.Recipient;
    RecipientCell.innerHTML += "<br>" + "(" + reports.expand.Recipient.email + ")";
    newRow.appendChild(RecipientCell);

    let dateCell = document.createElement('td');
    let dateFormat = await formatDate(reports.created);
    dateCell.textContent = dateFormat;
    newRow.appendChild(dateCell);

    let showTd = document.createElement('td');
    let showBtn = document.createElement('a');
    showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
    showTd.appendChild(showBtn);
    newRow.appendChild(showTd);

    showBtn.addEventListener('click', async () => {
      const cardContainer = document.getElementById('cardContainer');

      cardContainer.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'card';

      const senderElement = document.createElement('h3');
      senderElement.textContent = reports.expand.idUser.email;
      card.appendChild(senderElement);

      const div = document.createElement('hr');
      card.appendChild(div);

      const typeMessageElement = document.createElement('p');
      typeMessageElement.textContent = "Report";
      card.appendChild(typeMessageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'description';
      descriptionElement.textContent = reports.description;
      card.appendChild(descriptionElement);

      const div1 = document.createElement('hr');
      card.appendChild(div1)

      if (reports.field) {
        const nameFile = document.createElement('p');
        nameFile.textContent = reports.field;
        card.appendChild(nameFile);
        const attachmentElement = document.createElement('a');
        attachmentElement.className = 'attachment';
        attachmentElement.href = `${pb.baseUrl}/api/files/${reports.collectionId}/${reports.id}/${reports.field}`;
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
      RecipientElement.textContent = "Recipient :";
      RecipientElement.innerHTML += reports.Recipient +" (" + reports.expand.Recipient.email + ")";
      card.appendChild(RecipientElement);

      const createdElement = document.createElement('p');
      const createdFormat = await formatDate(reports.created);
      createdElement.textContent = reports.created;
      createdElement.innerHTML += "<br>" + "(" + createdFormat + ")";
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

  let listExcuses = await pb.collection('message_user').getList(1, 50, {
    sort: '-created',
    expand: 'idUser',
  });

  for (let i = 0; i < listExcuses.items.length; i++) {
    let excuses = listExcuses.items[i];
    let newRow = document.createElement('tr');

    let senderCell = document.createElement('td');
    senderCell.textContent = excuses.sender;
    senderCell.innerHTML +=  "<br>" + "("+ excuses.expand.idUser.email + ")";
    newRow.appendChild(senderCell);

    let descriptionCell = document.createElement('td');
    descriptionCell.textContent = excuses.description;
    newRow.appendChild(descriptionCell);

    let createdCell = document.createElement('td');
    const createdFormat = await formatDate(excuses.created);
    createdCell.textContent = excuses.created;
    createdCell.innerHTML +=  "<br>" + "("+ createdFormat + ")";
    newRow.appendChild(createdCell);

    let showTd = document.createElement('td');
    let showBtn = document.createElement('a');
    showBtn.innerHTML = '<img src="/img/eye_icon.png" class="icon a-button">';
    showTd.appendChild(showBtn);
    newRow.appendChild(showTd);
    showBtn.addEventListener('click', async () => {
      const cardContainer = document.getElementById('cardContainer');

      cardContainer.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'card';

      const senderElement = document.createElement('h3');
      senderElement.textContent = excuses.expand.idUser.email;
      card.appendChild(senderElement);

      const div = document.createElement('hr');
      card.appendChild(div);

      const typeMessageElement = document.createElement('p');
      typeMessageElement.textContent = "Excuse";
      card.appendChild(typeMessageElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.className = 'description';
      descriptionElement.textContent = excuses.description;
      card.appendChild(descriptionElement);

      const div1 = document.createElement('hr');
      card.appendChild(div1)

      if (excuses.field) {
        const nameFile = document.createElement('p');
        nameFile.textContent = excuses.field;
        card.appendChild(nameFile);
        const attachmentElement = document.createElement('a');
        attachmentElement.className = 'attachment';
        attachmentElement.href = `${pb.baseUrl}/api/files/${excuses.collectionId}/${excuses.id}/${excuses.field}`;
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
      RecipientElement.textContent = "All administrators";
      card.appendChild(RecipientElement);

      const createdElement = document.createElement('p');
      const createdFormat = await formatDate(excuses.created);
      createdElement.textContent = excuses.created;
      createdElement.innerHTML += "<br>" + "(" + createdFormat + ")";
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

  async function onCreateMessage() {

    let idUser = userData.id;
    let type_message = "report"
    let userReciepientCreate = document.getElementById('user-select-reciepient').value;
    let descriptionCreate = document.getElementById('descriptionCreate').value;
    let fieldCreate = document.getElementById('fieldCreate').files[0];

    try {
        await createMessage(idUser, type_message, descriptionCreate, fieldCreate, userReciepientCreate);
        alert('Message created successfully');
        window.location.reload();
    } catch (error) {
        alert("Error creating message: " + error);
    }
}

let createBtn = document.getElementById('create-btn');
createBtn.onclick = async () => {
    overlayCreate.style.display = 'block';

    let userReciepient = await pb.collection('users').getFullList({
        filter: `rol = "user"`,
    });
    let userReciepientSelect = document.getElementById('user-select-reciepient');
    userReciepientSelect.innerHTML = '';
    userReciepient.forEach(userReciepient => {
        console.log(userReciepient);
        let option = document.createElement('option');
        option.value = userReciepient.id;
        option.innerHTML = userReciepient.email;
        userReciepientSelect.appendChild(option);
    });

    let createForm = document.getElementById('create-form-btn');
    createForm.addEventListener('click', async (event) => {
        event.preventDefault(event);
        await onCreateMessage();


    })


}

}

getUserInfo();

document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("history");
  var tableYourReport = document.getElementById("tableYourReport");
  var tableExcuses = document.getElementById("tableExcuses");
  var tableReports = document.getElementById("tableReports")

  select.addEventListener("change", function () {
    if (select.value === "1") {
      tableYourReport.style.display = "table";
      tableExcuses.style.display = "none";
      tableReports.style.display = "none";
    } else if (select.value === "2") {
      tableYourReport.style.display = "none";
      tableExcuses.style.display = "none";
      tableReports.style.display = "table";
    } else if (select.value === "3") {
      tableYourReport.style.display = "none";
      tableExcuses.style.display = "table";
      tableReports.style.display = "none";
    } else {
      tableYourReport.style.display = "none";
      tableExcuses.style.display = "none";
      tableReports.style.display = "none";
    }
  });
});

document.querySelector('#logout-btn').addEventListener('click', async () => {
  pb.authStore.clear();
  window.location.replace("../../../login.html");
});

document.querySelector('#home-btn').addEventListener('click', async () => {
  window.location.href = "administratorHome";
});

document.querySelector('#data-btn').addEventListener('click', async () => {
  window.location.href = "messengerService";
});

document.querySelector('#module-btn').addEventListener('click', async () => {
  window.location.href = "users";
});