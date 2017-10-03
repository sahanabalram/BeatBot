var db = require("../models");

module.exports = function(app) {
    app.get("/top-10", function(req, res) {
        res.render("index", function(req,res) {
            console.log("Top 10");
        });      
    });
}