'use strict';

var assert = require('assert');
var lib = require('../lib');

describe('banner/lib', function(school){ 

  /**
   * SETUP
   */
  before(function(){
    this.cache = {};
  });

  /**
   * GET_TERMS()
   */
  describe('#getTerms()', function () {

    before(async () => {
      this.cache = this.test.parent.parent.ctx.cache;
      try {
        this.cache.getTerms = await banner.getTerms();
      } catch (error) {
        console.error(error);
        this.cache.getTerms = error;
      }
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
      this.cache = this.test.parent.parent.ctx.cache;
      this.cache.getSubjects = await banner.getSubjects(term);
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
      this.cache = this.test.parent.parent.ctx.cache;
      cache.campus = await banner.getCampus();
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
      this.cache = this.test.parent.parent.ctx.cache;
      cache.colleges = await banner.getColleges();
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
      this.cache = this.test.parent.parent.ctx.cache;
      cache.attributes = await banner.getAttributes();
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
      this.cache = this.test.parent.parent.ctx.cache;
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
      this.cache = this.test.parent.parent.ctx.cache;
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
      this.cache = this.test.parent.parent.ctx.cache;
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

  // /**
  //  * GETALLCOURSES()
  //  */
  // describe('#getAllCourses()', function () {
  //   this.timeout(30000);

  //   before(async () => {
  //     cache.courses = await banner.getAllCourses(term);
  //   });

  //   it('Should throw an error when a term is not passed', function () {
  //     assert.rejects(async () => await banner.getAllCourses(), Error, 'Must provide term');
  //   });

  //   it('Should not return NULL', function(){
  //     assert.strict(cache.courses);
  //   });

  //   it('Should return a non-empty array', function () {
  //     assert.strict(cache.courses.length > 0);
  //   });

  //   it('Should retrieve courses for each subject', function () {
  //     let uniqueSubjects = [...new Set(cache.courses.map(item => item.subject))];
  //     assert.strict(cache.subjects.length === uniqueSubjects.length);
  //   });
  // });
});