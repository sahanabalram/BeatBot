var assert = require('assert');
var expect = require("chai").expect;
var request = require('request');

// Home Page test

describe("Home Page  Test", function () {
    var url = "http://localhost:4005/";
    it("returns status 200", function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});

// Sign-Up page test

describe("Sign-Up Page Loading Test", function () {
    var url = "http://localhost:4005/signup";
    it("returns status 200", function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});


// User Page test

describe("Home Page Loading Test", function () {
    var url = "http://localhost:3100/user";
    it("returns status 200", function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});

// Sign Up and Create User in Database
describe("User sign up", function() {
    var url = "http://localhost:4005/signup";
    it("signs up a user", function() {
        request({
            uri: url,
            method: 'POST',
            json: {
                username: "Sahana2008",
                password: "password2009",
                email: "rsahana@gmail.com",
            }
        }, function(error, body, response) {
            if (error) throw error;
            expect(response.statusCode).to.equal(302);

        });
    });
});