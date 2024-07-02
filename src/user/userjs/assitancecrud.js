import { pb } from '../../../global.js';

export async function deleteAssistance(id) {
    let result = await pb.collection('assistance').delete(id);
    console.log(result);
}

export async function updateAssistance(id, verification) {
    let result = await pb.collection('assistance').update(id, {
        verification: verification,
    });
    console.log(result);
}
