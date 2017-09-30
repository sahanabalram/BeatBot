// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the songs
  app.get("/api/songs", function(req, res) {
    // Add sequelize code to find all songs, and return them to the user with res.json
    db.Song.findAll({}).then(function(result){
       return res.json(result);
    });
  });

  app.post("/api/songs",function(req,res){
      db.Song.create({
          artist: req.body.artist,
          title: req.body.title,
          year: req.body.year,
          raw_total: req.body.raw_total,
          raw_usa: req.body.raw_usa,
          raw_uk: req.body.raw_uk,
          raw_eur: req.body.raw_eur,
          raw_row: req.body.raw_row,
      }).then(function(result){
          res.json(result);
      });
  });
  // Get route for retrieving a single post
  app.get("/api/songs/:id", function(req, res) {
    // Add sequelize code to find a single song where the id is equal to req.params.id,
    // return the result to the user with res.json

    db.Song.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(result){
      return res.json(result);
    })
  });

  // DELETE route for deleting songs
  app.delete("/api/songs/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id, 
    // then return the result to the user using res.json

    db.Song.destroy({
      where: {
        id:req.params.id
      }
    }).then(function(result){
      return res.json(result);
    });
  });
};
