var db = require("../models");
var exports = module.exports = {}

exports.signup = function(req, res) {
    var themessage = req.flash("signupMess")[0];
    console.log(themessage);
    res.render("signup", {error: themessage});
}

exports.index = function(req, res) {
    res.redirect("/signup");
}

exports.user = function(req, res) {
    // CAN PASS MORE THAN ONE OBJECT THROUGH RENDER
    res.render("user", {reqs: req.user, val: res.locals.user});
}

/**
 * searchPost is called from auth.js after a post has been sent to /search
 * it then creates a new record for Searches in the beatbot_db database
 * including Query and userId
 */
exports.searchPost = function(req,res) {
    console.log("query: ",req.body.value," userId:",res.locals.user.id);
    db.Search.create({
        query: req.body.value,
        userId: res.locals.user.id
    }).then(function(result) {
        console.log("success");
    });
    res.render("user", {val: res.locals.user, searched: req.body});
}

// Currently not utilized, but could be utilized rather quickly
exports.searchQuery = function(req,res) {
    console.log("Search Query: ",req.params.query);
    res.render("user", {query: req.params.query});
}

// Logout function!
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
}

/**
 * API CONTROLLERS
 */
exports.top10songs = function(req, res) {
    db.Song.findAll({}).then(function (result) {
        res.json(result);
      });
}