var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");




var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));



var itunes = require('itunes-search');
var SpotifyWebApi = require('spotify-web-api-node');
var PlayMusic = require('playmusic');
//------------------------------------------------------------
var result = {
		apple: [],
		spotify: [],
		google: [],
		mv: ""
};



var options = {
	    media: "music"
	  , entity: ""
	  , limit: 10
	}

var spotifyApi = new SpotifyWebApi({
	  clientId : '26e7e461255f4d1ca61d06d85c55e56d',
	  clientSecret : '8005e4cceb1a49958d902ff43df0295d',
	  redirectUri : 'http://www.example.com/callback'
	});

spotifyApi.clientCredentialsGrant()
.then(function(data) {
console.log('The access token expires in ' + data.body['expires_in']);
console.log('The access token is ' + data.body['access_token']);

// Save the access token so that it's used in future calls
spotifyApi.setAccessToken(data.body['access_token']);
}, function(err) {
console.log('Something went wrong when retrieving an access token', err.message);
});

var pm = new PlayMusic();


app.get("/search", function(req, res) {
    res.json("200");
  });

app.post("/search", function(req, res) {
//Apple Music-------------------------------------------------------
	itunes.search(JSON.parse(req.body).song, options, function(data) {
		result.apple = [];
		for (var i = 0; i < data.results.length; i++) {
			var item = {
					song: data.results[i].trackName,
					artist: data.results[i].artistName,
					album: data.results[i].collectionName,
					img: data.results[i].artworkUrl100,
					url: data.results[i].trackViewUrl,
					preview: data.results[i].previewUrl
			}
			result.apple.push(item)
		}
//		res.json(data)
		
	})	
//Spotify-------------------------------------------------------
	spotifyApi.searchTracks(JSON.parse(req.body).song, {limit: 10})
	.then(function(data) {
		result.spotify = [];
		for (var i = 0; i < data.body.tracks.items.length; i++) {
			var item = {
					song: data.body.tracks.items[i].name,
					artist: data.body.tracks.items[i].artists[0].name,
					album: data.body.tracks.items[i].album.name,
					img: data.body.tracks.items[i].album.images[1].url,
					url: data.body.tracks.items[i].external_urls.spotify,
					preview: null
			}
			result.spotify.push(item)
		}
		
		
//	  res.json(data)
	}, function(err) {
	  console.log('Something went wrong!', err);
	});
	
//Google-------------------------------------------------------	
	pm.init({email: "boyuanl1@icloud.com", password: "Bryan19940113"}, function(err) {
	    if(err) console.error(err);

	    pm.search(JSON.parse(req.body).song, 10, function(err, data) { 
		    	result.google = [];
			for (var i = 0; i < data.entries.length; i++) {
				if (data.entries[i].type == 8) {
					result.mv = "https://www.youtube.com/watch?v=" + data.entries[i].youtube_video.id;
					break;
				}

			}
			
			for (var i = 0; i < data.entries.length; i++) {
				if (data.entries[i].type == 6) {
					if (data.entries[i].station.seed.trackId == undefined) {
						continue;
					}
					var item = {
							song: data.entries[i].station.name,
							artist: null,
							album: null,
							img: data.entries[i].station.imageUrls[0].url,
							url: "https://play.google.com/music/listen?authuser&u=0#/wst/sm/" + data.entries[i].station.seed.trackId,
							preview: null
					}
					result.google.push(item)
				}

			}
//	        res.json(data)
	        });

	});
//------------------------------------------------------------	
	res.json(result);
	
});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });