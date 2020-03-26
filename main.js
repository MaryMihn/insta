document.getElementById('search').addEventListener('click', function () {
	const user = document.getElementById('user').value

	if (!user) {
		alert('Enter user name please!')
		return
	}

	fetch(`https://www.instagram.com/${user}/?__a=1`)
		.then(res => res.json())
		.then(handler)
		.catch(() => {
			alert('Something went wrong. Try again later.')
		})
})

function handler (response) {
	const user = response.graphql.user;

	document.getElementById('username').innerText = user.username;
	document.title = response.graphql.user.username;
	document.getElementById('avatar').src = user.profile_pic_url_hd;
	document.getElementById('posts').innerText = user.edge_owner_to_timeline_media.count;
	document.getElementById('followers').innerText = user.edge_followed_by.count;
	document.getElementById('following').innerText = user.edge_follow.count;
	document.getElementById('full_name').innerText = user.full_name;
	document.getElementById('biography').innerText = user.biography;

	const hidden = document.getElementsByClassName('hidden')[0];
	if (hidden) {
		hidden.classList.remove('hidden');
	}

	const photos = user.edge_owner_to_timeline_media.edges;

	let elements = '';
	for (const photo of photos) {
		const src = photo.node.thumbnail_src;
		elements +=`<img class="photo" src="${src}">`
	}

	if (user.edge_owner_to_timeline_media.count > 0 && elements === '' ){
		document.getElementById('photos').innerText = 'This Account is Private'
	} else {
		document.getElementById('photos').innerHTML = elements
	}
}
