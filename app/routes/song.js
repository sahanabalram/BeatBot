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

  // GET route for getting all of the songs
  app.get("/api/top10songs", function (req, res) {
    // Add sequelize code to find all songs, and return them to the user with res.json
    db.Song.findAll({}).then(function (result) {
      res.json(result);
    });
  });

  // Get route for retrieving a single song
  app.get("/api/songs/:id", function (req, res) {
    // Add sequelize code to find a single song where the id is equal to req.params.id,
    // return the result to the user with res.json

    db.Song.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    })
  });

  // DELETE route for deleting songs
  app.delete("/api/songs/:id", function (req, res) {
    // Add sequelize code to delete a song where the id is equal to req.params.id, 
    // then return the result to the user using res.json

    db.Song.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });
};