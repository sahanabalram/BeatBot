// Required dependencies 
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Set app to the express function
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up database models for "syncin"
var db = require("./models");

// Makes req.user a global value of res.locals.user
app.use(function(req, res, next) {
    if(!req.user) console.log("Not logged in!");
    res.locals.user = req.user;
    next();
});

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars
var exphand = require("express-handlebars");

app.engine("handlebars", exphand({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up Expres to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// Static Directory
app.use(express.static("public"));

// Routes
require("./routes/login-routes.js")(app);
require("./routes/playlist-routes.js")(app);
require("./routes/search-routes.js")(app);
require("./routes/top-10-routes.js")(app);

// Syncing Sequelize and Starting Express App
db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
        console.log("App is listening to PORT: ", PORT);
    });
});