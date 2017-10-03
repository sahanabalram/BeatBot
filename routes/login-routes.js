var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index", function(req,res) {
            console.log(req);
        });      
    });
}