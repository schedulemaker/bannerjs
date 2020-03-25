'use strict';

var assert = require('assert');
var Banner = require('../index');
const config = require('../lib/config');

/**
 * Universal tests
 */
describe('Banner', function () {
  /**
     * CONSTRUCTOR
     */
  describe('#constructor(school)', function () {
    it('Should throw an error when a school is not passed', function () {
      assert.throws(function () { new Banner() }, Error, 'Must provide school');
    });

    it('Should throw an error when the school passed is not in the config', function () {
      let school = 'lolz';
      assert.throws(function () { new Banner(school) }, Error, `Unsupported school "${school}"`);
    });
  });
});

Object.keys(config.schools).forEach(function (school) {
  describe(`Banner-${school}`, function () {

    /**
     * SETUP
     */
    before(function(){
      var cache = {};
      var banner = new Banner(school);
    });
    
    


  });
});
