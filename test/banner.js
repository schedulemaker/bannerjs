'use strict';

var assert = require('assert');
var Banner = require('../index');

describe('Banner', function () {
  /**
   * SETUP
   */
  const school = 'temple';
  const term = 202003;
  var cache = {};

  /**
   * CONSTRUCTOR
   */
  describe('#constructor(school)', function () {
    it('Should throw an error when a school is not passed', function () {
      assert.throws(() => new Banner(), Error, 'Must provide school');
    });
  });

  /**
   * SETUP
   */
  var banner = new Banner(school);

  
});
