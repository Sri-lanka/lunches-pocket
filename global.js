import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export async function logIn(email, password) {
    try {
        return await pb.collection('users').authWithPassword(email, password);
    } catch (error) {
        return null;
    }
}

export async function register(data) {
    try {
        return await pb.collection('users').create(data);
    } catch (error) {
        return null;
    }
}

export async function formatDate(isoDate) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const formattedHours = String(hours).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    return formattedDate;
}

export async function convertDTLtoIso(dateTimeLocal) {

    const [datePart, timePart] = dateTimeLocal.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const date = new Date(year, month - 1, day, hour, minute);

    const isoDate = date.toISOString().replace('.000Z', 'Z');

    return isoDate;
}

