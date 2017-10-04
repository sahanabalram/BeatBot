var express = require("express");
var app = express();

var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var db = require("./models");
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

// Routes
require("./routes/song.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/users.js")(app);

// app.get("/", function(req,res) {
//     res.send("Welcome to Passport with Sequelize!");
// });

app.listen(3001, function(err) {
    if(!err)
        console.log("Site is living!"); //server.address().port
    else console.error(err);
});
