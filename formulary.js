import { pb, sendAssistance } from './global.js';

document.querySelector('#send-assistance').addEventListener('click', async (e) => {
    e.preventDefault();

    let documentSearch = document.getElementById('documentSearch').value;

    let email = document.getElementById('email').value;



    let data = await pb.collection('users').getFullList({
        filter: `email = "${email}" && document = "${documentSearch}"`,
    });

    if (data && Array.isArray(data) && data.length > 0) {
        if (data[0].rol === "user") {
            let idUser = data[0].id;
            try {
                await sendAssistance(idUser, false);
                alert("assistance sent");
                window.location.reload();
            } catch (error) {
                alert("failed to send assistance" + error);
            }
        } else {
            alert("You can't send assistance to admin");
        }
    } else {
        alert("No data found");
    }

});