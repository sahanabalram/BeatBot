var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var itunes = require('itunes-search');
var SpotifyWebApi = require('spotify-web-api-node');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));


//-------------------------------------------
var options = {
	    media: "music"
	  , entity: ""
	  , limit: 10
	}

app.get("/applemusic", function(req, res) {
    res.json("200");
  });

app.post("/applemusic", function(req, res) {
	itunes.search(JSON.parse(req.body).song, options, function(response) {
		res.json(response);
	})	
});
//-------------------------------------------
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



app.get("/spotify", function(req, res) {
    res.json("200");
  });

app.post("/spotify", function(req, res) {
	spotifyApi.searchTracks('track:Counting Stars')
	.then(function(data) {
	  console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
	  res.json(data)
	}, function(err) {
	  console.log('Something went wrong!', err);
	});
	
});
//-------------------------------------------







app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });