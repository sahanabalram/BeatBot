var assert = require('assert');
var expect = require("chai").expect;
var request = require('request');
var chai = require("chai");
var should = chai.should();
var chaiHttp = require('chai-http');
let server = require('../server');
chai.use(chaiHttp);
// Home Page test
describe("Home Page Loading Test", function () {
    var url = "http://localhost:4005";
    it("returns status 200", function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});

// Sign-Up page test
describe("Home Page Loading Test", function () {
    var url = "http://localhost:4005/signup";
    it("returns status 200", function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });
});

// Find Music Search 
// correct api for spotify search scenario-1

describe('/GET /api/search/spotify/coldplay', () => {
    it('it should GET songs from Spotify', (done) => {
      chai.request(server)
          .get('/api/search/spotify/coldplay')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

//  correct api search for iTunes search scenario-1
describe('/GET /api/search/itunes/coldplay', () => {
    it('it should GET songs from iTunes', (done) => {
      chai.request(server)
          .get('/api/search/itunes/coldplay')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
          });
    });
});

// incorrect api search for itune - scenario :2
describe('/GET /api/search/itune/coldplay', () => {
    it('it should GET songs from iTunes', (done) => {
      chai.request(server)
          .get('/api/search/itune/coldplay')
          .end((err, res) => {
              res.should.have.status(404);
            done();
          });
    });
});

//  incorrect spotify search - scenario : 2
describe('/GET /api/search/spot/coldplay', () => {
    it('it should GET songs from Spotify', (done) => {
      chai.request(server)
          .get('/api/search/spot/coldplay')
          .end((err, res) => {
              res.should.have.status(404);
            done();
          });
    });
});

// User Page test

describe("Home Page Loading Test", function () {
    var url = "http://localhost:4005/user";
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