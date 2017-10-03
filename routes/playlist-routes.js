var db = require("../models");

module.exports = function(app) {
    app.get("/playlist/:username", function(req, res) {
        // res.render("", function(req,res) {
        //     console.log(req.params.username);
        // });   
        console.log("Heheh");   
    });
}