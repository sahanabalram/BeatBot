// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads user.html
  app.get("/", function(req, res) {
    console.log("Value: ",res.locals.user);
    // res.sendFile(path.join(__dirname, "../public/user.html"));
    res.render("index", {userInfo: req.params.user});
  });

};
