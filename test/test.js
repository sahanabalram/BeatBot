var assert = require('assert');



describe('Array', function() {
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
});