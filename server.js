// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var expressHandleBars = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var session = require("session");





// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



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
// =============================================================
require("./routes/song.js")(app);
require("./routes/html-routes.js")(app);
require("./app/routes/auth.js")(app, passport);
require("./app/config/passport/passport.js")(passport, db.user);


// Syncing our sequelize models and then starting our Express app
// =============================================================
var db = require("./models");


db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
