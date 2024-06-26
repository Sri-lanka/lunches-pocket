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

/*
// after the above you can also access the auth data from the authStore
console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore.model.id);

// "logout" the last authenticated account
pb.authStore.clear();
document.getElementById('login-form').addEventListener('submit', authData);
*/