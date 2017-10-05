// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // Get route for retrieving a single post
  app.get("/", function (req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json

    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      return res.json(result);
    })
  });

  // POST route for saving a new post
  app.post("/register", function (req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json

    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function (result) {
      res.json(result);
    });
  });

  app.post("/login", function (req, res, result) {
    // validate the req that is received from the user
    console.log(req.body.email);
    console.log(req.body.password);

    function validate(request, response) {
      var username;
      var password;
      
    }
  });
}