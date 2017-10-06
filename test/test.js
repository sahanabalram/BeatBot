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