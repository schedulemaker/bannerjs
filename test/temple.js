/*jshint esversion: 8*/
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

  /**
   * _RESET()
   */
  describe('#_reset()', function () {
    it('Should return cookie value', async function () {
      let cookie = await banner._reset(term)
      assert.strict(cookie.length === 2);
      assert.strict(cookie[0].startsWith('JSESSIONID'));
      assert.strict(cookie[1].startsWith('BIGipServer'));
    });
  });



  /**
   * GET_TERMS()
   */
  describe('#getTerms()', function () {

    before(async () => {
      try {
        cache.terms = await banner.getTerms();
      } catch (e) {
        console.error(e);
      }
    });

    it('Should not throw an error', function () {
      assert.doesNotReject(async () => await banner.getTerms());
    });

    it('Should not return void', function () {
      assert.strict(cache.terms);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.terms.length > 0);
    });
  });

  /**
   * GETSUBJECTS()
   */
  describe('#getSubjects()', function () {

    before(async () => {
      try {
        cache.subjects = await banner.getSubjects(term);
      } catch (e) {
        console.error(e);
      }

    });

    it('Should throw an error when a term is not passed', function () {
      assert.rejects(async () => await banner.getSubjects(), Error, 'Must provide term');
    });

    it('Should not return void', function () {
      assert.strict(cache.subjects);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.subjects.length > 0);
    });
  });

  /**
   * GETCAMPUS()
   */
  describe('#getCampus()', function () {

    before(async () => {
      try {
        cache.campus = await banner.getCampus();
      } catch (e) {
      console.error(e);
      }
    });

    it('Should not throw an error', function () {
      assert.doesNotReject(async () => await banner.getCampus());
    });

    it('Should not return void', function () {
      assert.strict(cache.campus);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.campus.length > 0);
    });
  });

  /**
   * GETCOLLEGES()
   */
  describe('#getColleges()', function () {

    before(async () => {
      cache.colleges = await banner.getColleges();
    });

    it('Should not throw an error', function () {
      assert.doesNotReject(async () => await banner.getColleges());
    });

    it('Should not return void', function () {
      assert.strict(cache.colleges);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.colleges.length > 0);
    });
  });

  /**
   * GETATTRIBUTES()
   */
  describe('#getAttributes()', function () {

    before(async () => {
      cache.attributes = await banner.getAttributes();
    });

    it('Should not throw an error', function () {
      assert.doesNotReject(async () => await banner.getAttributes());
    });

    it('Should not return void', function () {
      assert.strict(cache.attributes);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.attributes.length > 0);
    });
  });

  /**
   * GETINSTRUCTORS()
   */
  describe('#getInstructors()', function () {
    this.timeout(15000);

    before(async () => {
      cache.instructors = await banner.getInstructors(term);
    });

    it('Should throw an error when a term is not passed', function () {
      assert.rejects(async () => await banner.getInstructors(), Error, 'Must provide term');
    });

    it('Should not return void', function () {
      assert.strict(cache.instructors);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.instructors.length > 0);
    });
  });

  /**
   * CLASS_SEARCH()
   */
  describe('#classSearch(subjects)', function () {
    this.timeout(30000);

    before(async () => {
      cache.classes = await banner.classSearch(term, 'CIS');
    });

    it('Should throw an error when a subject and term are not passed', function () {
      assert.rejects(async () =>await banner.classSearch(), Error, 'Must provide term and subject');
    });

    it('Should not return NULL', function(){
      assert.strict(cache.classes);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.classes.length > 0);
    });
  });

  /**
   * CATALOGSEARCH()
   */
  describe('#catalogSearch(subjects)', function () {
    this.timeout(30000);

    before(async () => {
      cache.catalog = await banner.catalogSearch(term, 'CIS');
    });

    it('Should throw an error when a term and subject are not passed', function () {
      assert.rejects(async () => await banner.catalogSearch(), Error, 'Must provide term and subject');
    });

    it('Should not return NULL', function(){
      assert.strict(cache.catalog);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.catalog.length > 0);
    });
  });

  /**
   * GETALLCOURSES()
   */
  describe('#getAllCourses()', function () {
    this.timeout(30000);

    before(async () => {
      cache.courses = await banner.getAllCourses(term);
    });

    it('Should throw an error when a term is not passed', function () {
      assert.rejects(async () => await banner.getAllCourses(), Error, 'Must provide term');
    });

    it('Should not return NULL', function(){
      assert.strict(cache.courses);
    });

    it('Should return a non-empty array', function () {
      assert.strict(cache.courses.length > 0);
    });

    it('Should retrieve courses for each subject', function () {
      let uniqueSubjects = [...new Set(cache.courses.map(item => item.subject))];
      assert.strict(cache.subjects.length === uniqueSubjects.length);
    });
  });
});
