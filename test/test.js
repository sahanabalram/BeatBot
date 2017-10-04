 var assert = require('assert');
var should = require('should');


/* describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Array', function() {
  describe('#length()', function() {
    it('should return 3 when three values are present', function() {
      assert.equal(3, [1,2,3].length);
    });
  });
});  */

var db = require('../models');
describe("Users", function () {
  it("retrieves by username", function (done) {
    db.User.findOne(
      {"where": {
        "username":"peggy"
      }
    }).then(function (doc) {
      console.log(doc.dataValues.username);
      doc.dataValues.username.should.equal('peggy');
      done();
    }).catch(function(err){
      console.log(err);
    });
  });
});