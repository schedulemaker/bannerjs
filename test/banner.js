'use strict';

var assert = require('assert');
var Banner = require('../index');
const config = require('../lib/config');

/**
 * Universal tests
 */
describe('Banner', function () {
  Object.keys(config.schools).forEach(function (school) {
    describe(`Banner-${school}`, function () {
  
      /**
       * SETUP
       */
      before(function(){
        this.cache = {};
        this.banner = new Banner(school);
      });
      
      /**
     * CONSTRUCTOR
     */
      describe('#constructor(school)', function () {
        it('Should throw an error when a school is not passed', function () {
          assert.throws(function () { new Banner() }, Error, 'Must provide school');
        });

        it('Should throw an error when the school passed is not in the config', function () {
          let fakeSchool = 'lolz';
          assert.throws(function () { new Banner(fakeSchool) }, Error, `Unsupported school "${school}"`);
        });
      });
    });
  });
});


