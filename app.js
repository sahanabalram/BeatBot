var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var itunes = require('itunes-search');
//var Spotify = require('node-spotify-api');

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
//var spotify = new Spotify({
//	  id: "26e7e461255f4d1ca61d06d85c55e56d",
//	  secret: "8005e4cceb1a49958d902ff43df0295d"
//	});

//spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//	  if (err) {
//	    return console.log('Error occurred: ' + err);
//	  }
//	 console.log(data)
//	
//	});
app.get("/spotify", function(req, res) {
    res.json("200");
  });

app.post("/spotify", function(req, res) {

});








app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });