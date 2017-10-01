// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app, passport) {

    // Get route for retrieving a single post
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    // POST route for saving a new post
    app.post("/register", passport.authenticate('local-register', {
        successRedirect: '/index',
        failureFlash: '/register'
    }));
}