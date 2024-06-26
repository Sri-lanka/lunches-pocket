import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


async function main() {
	const list = await pb.collection('test').getList();
	let content = document.querySelector('#content');

	list.items.forEach(
		e => {
			content.innerHTML += '<p class="user">' + e.title + '</p>'
		}
	);
}

main();