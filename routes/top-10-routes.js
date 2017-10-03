var db = require("../models");

module.exports = function(app) {
    app.get("/top-10", function(req, res) {
        theVal = res.locals.user;
        console.log(theVal);
        res.render("index", {theVal});      
    });
}