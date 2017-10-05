var express = require("express");
var app = express();
var expressHandleBars = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var session = require("session");


var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var db = require("./app/models");
app.use(express.static("public"));

db.sequelize.sync().then(function() {
    console.log("Nice! Database looks fine!");
}).catch(function(err) {
    console.error("Something went wrong: ",err);
});

app.engine("handlebars", exphbs({defaultLayout: "main",extname: ".handlebars"}));
app.set("view engine", "handlebars");

app.use(function(req, res, next) {
    res.locals.user = req.user;
    if(!req.user){
        console.log("Not logged in!");
        res.locals.user = "NotLoggedIn";
        next();
    }else {
        console.log("You have been loggged in!");
        console.log("Response: ",req.user.email);
        next();
    }
});

// Static directory
app.use(express.static("public"));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

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



// Routes
require("./app/routes/song.js")(app);
require("./app/routes/html-routes.js")(app);
require("./app/routes/users.js")(app);
require("./app/routes/auth.js")(app, passport);
require("./app/config/passport/passport.js")(passport, db.user);

// app.get("/", function(req,res) {
//     res.send("Welcome to Passport with Sequelize!");
// });

app.listen(3001, function(err) {
    if(!err)
        console.log("Site is living!"); //server.address().port
    else console.error(err);
});
