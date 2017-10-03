var db = require("../models");

module.exports = function(app) {
    app.get("/search/:value", function(req, res, next) {
        console.log(req.params.value);
        console.log(res.locals.user);
    });
}