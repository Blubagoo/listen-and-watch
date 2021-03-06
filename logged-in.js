
	let url = window.location.href;
	let access_token = url.split('=');
	let token_type = access_token[1].split('&');
	let token = token_type[0];
	console.log(token);
	



//listen for submit
function listenForSubmit(token) {
	$('#container').submit('#search-btn', function(e) {
		e.preventDefault();
		let artist = $('#search-box').val();
		$('#search-box').val('');
		console.log(artist);
		artistSearchAPI(artist,token);
	});
}


//send to spotify
function artistSearchAPI(artist, token) {
	const settings = {
		url: 'https://api.spotify.com/v1/search',
		headers: {
			Authorization: "Bearer " + token

		},
		data: {
			q: artist,
			type: 'artist',
			limit: 20
		},
		dataType: 'json',
		method: 'GET',
		success: function(data) {
			console.log('success', data);
			displayResults(data);
		},
		error: function() {
			console.log(arguments);
		}
	}
	$.ajax(settings);
}

function getAlbumFromSpotify(id) {
	const settings = {
		url:'https://api.spotify.com/v1/artists/' + id + '/albums',
		headers:{
			Authorization: "Bearer " + token
		},
		dataType: "json",
		success: function(data) {
			console.log('success', data);
			displayAlbums(data);

		},
		error:function () {
			console.log(arguments);
		},
	}
	$.ajax(settings);
}

//render results
function getId(item) { //fix jquery tags
	const id = `${item.id}`;
	getAlbumFromSpotify(id);
}






//display results
function displayResults(artists) {
	const selection = artists.artists.items[0]
	getId(selection);
	console.log('selection data', selection);
}

function renderAblum(item) {
	return `
	<div class="thumb-albums">
	<img src="${item.images[2].url}" alt="${item.name}" class="images">
	<p class="thumb-info">${item.name}</p>
	</div>`

}
function displayAlbums(data) {
	const album = data.items.map((item, index) => renderAblum(item));
	$('#form-area').html(album);

}
//user picks album 
function listenForAlbum() {

}
//send to lyrics ovh
function getLyrics(artist, title) {
	const settings = {
		url:"https://api.lyrics.ovh/v1/",
		data: {
			artist: artist,
			title: title 
		},
		dataType: "JSON",
		method: "GET",
		success: function() {
			console.log("success", data);
		},
		error: function() {
			console.log(arguments);
		}
	}
	$.ajax(settings);
}
//send to ticketmaster
function getEvents(artist) {
	const settings = {
		url: "https://app.ticketmaster.com/discovery/v2/attractions",
		headers: {
			apikey: "foT0mqx1A21ZxgjogM48Svp5vNF7gbgy"
		},
		data: {
			keyword: artist
		},
		async: true,
		dataType: "JSON",
		method:"GET",
		success: function () {
			console.log("success", data);
			renderEvents(data);
		},
		error: function() {
			console.log(arguments);
		}
	};
	$.ajax(settings)
}

//fill lyrics 
function renderLyrics() {

}
//fill events
function renderEvents() {

}
//load hud
function renderHUD() {

}
function displayHUD() {

}
//highlight start over
function highlightRestart() {

}
//run callbacks
function loadCallbacks() {
	listenForSubmit(token);
}

$(loadCallbacks);
