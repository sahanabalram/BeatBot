var express = require("express");
var app = express();

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3002;
var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Music Stuff
 */
var itunes = require('itunes-search');
var SpotifyWebApi = require('spotify-web-api-node');
var PlayMusic = require('playmusic');

var result = {apple: [],spotify: [],google: [],mv: ""};
var options = { media: "music", entity: "", limit: 10}
var spotifyApi = new SpotifyWebApi({
  clientId : '26e7e461255f4d1ca61d06d85c55e56d',
  clientSecret : '8005e4cceb1a49958d902ff43df0295d',
  redirectUri : 'http://www.example.com/callback'
});
var pm = new PlayMusic();

// Connect-Flash
var flash = require('connect-flash');

app.use(flash());

// Static Directory
app.use(express.static("public"));

var db = require("./app/models");

db.sequelize.sync().then(function() {
    console.log("Sequelize Connected!");
}).catch(function(err) {
    console.error("Something went wrong: ",err);
});

app.set('views', __dirname + '/app/views');

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
        defaultLayout: 'main', 
        extname: '.hbs',
        layoutsDir:'app/views/layouts',
        partialsDir:'app/views/partials'
}));
app.set('view engine', '.hbs');

console.log(app.get("views"));

app.use(function(req, res, next) {
    res.locals.user = req.user;
    if(!req.user){
        next();
    }else {
        next();
    }
});

require("./app/routes/auth.js")(app, passport);
require("./app/config/passport/passport.js")(passport, db.user);

app.listen(PORT, function () {
	console.log("App listening on PORT " + PORT);
});
