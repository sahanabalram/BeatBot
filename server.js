// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var expressHandleBars = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require("method-override");
var session = require("express-session");



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Sets up the passport sessions, intialize 
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/userauth.js")(app,passport);

// Syncing our sequelize models and then starting our Express app
// =============================================================
var db = require("./models");
require("./config/passport/userAuthentication.js")(passport,db.User);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
