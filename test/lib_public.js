'use strict';

var assert = require('assert');
var lib = require('../lib/public');

describe('banner/lib', function(school){ 

  /**
   * SETUP
   */
  before(function(){
    this.cache = {};
    this.School = 'temple';
  });

  /**
   * GET_TERMS()
   */
  describe('#getTerms()', function () {

    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      try {
        this.cache.getTerms = await lib.getTerms.call(this.context);
      } catch (error) {
        console.error(error);
        this.cache.getTerms = error;
      }
    });

    it('Should not return NULL', function () {
      assert.strict(this.cache.getTerms);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getTerms.length > 0);
    });
  });

  /**
   * GETSUBJECTS()
   */
  describe('#getSubjects(term)', function () {

    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      this.term = 202036;
      try {
        this.cache.getSubjects = await lib.getSubjects.call(this.context, this.term);
      } catch (error) {
        console.error(error);
        this.cache.getSubjects = error;
      }
    });

    it('Should throw an error when a term is not passed', function () {
      assert.rejects(lib.getSubjects(), Error('Must provide term'));
    });

    it('Should not return NULL', function () {
      assert.strict(this.cache.getSubjects);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getSubjects.length > 0);
    });
  });

  /**
   * GETCAMPUS()
   */
  describe('#getCampuses()', function () {

    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      try {
        this.cache.getCampuses = await lib.getCampuses.call(this.context);
      } catch (error) {
        console.error(error);
        this.cache.getCampuses = error;
      }
    });

    it('Should not return NULL', function () {
      assert.strict(this.cache.getCampuses);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getCampuses.length > 0);
    });
  });

  /**
   * GETCOLLEGES()
   */
  describe('#getColleges()', function () {

    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      try {
        this.cache.getColleges = await lib.getColleges.call(this.context);
      } catch (error) {
        console.error(error);
        this.cache.getColleges = error;
      }
    });

    it('Should not return NULL', function () {
      assert.strict(this.cache.getColleges);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getColleges.length > 0);
    });
  });

  /**
   * GETATTRIBUTES()
   */
  describe('#getAttributes()', function () {

    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      try {
        this.cache.getAttributes = await lib.getAttributes.call(this.context);
      } catch (error) {
        console.error(error);
        this.cache.getAttributes = error;
      }
    });

    it('Should not return NULL', function () {
      assert.strict(this.cache.getAttributes);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getAttributes.length > 0);
    });
  });

  /**
   * GETINSTRUCTORS()
   */
  describe('#getInstructors(term)', function () {
    before(async function(){
      this.timeout(3000);
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      this.term = 202036;
      try {
        this.cache.getInstructors = await lib.getInstructors.call(this.context, this.term);
      } catch (error) {
        console.error(error);
        this.cache.getInstructors = error;
      }
    });

    it('Should throw an error when a term is not passed', function () {
      assert.rejects(lib.getInstructors(), Error('Must provide term'));
    });

    it('Should not return void', function () {
      assert.strict(this.cache.getInstructors);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.getInstructors.length > 0);
    });
  });

  /**
   * CLASS_SEARCH()
   */
  describe('#classSearch(term, subject)', function () {
    before(async function(){
      this.args = {
        term: 202036,
        subject: 'CIS',
        offset: Math.ceil(Math.random() * Math.floor(5)),
        pageSize: 25
      }
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      try {
        this.cache.classSearch = await lib.classSearch.call(this.context, ...Object.values(this.args));
      } catch (error) {
        console.error(error);
        this.cache.classSearch = error;
      }
    });

    it('Should throw an error when a subject and term are not passed', function () {
      assert.rejects(lib.classSearch.call(this.context), Error('Must provide term and subject'))
      let incompleteArgs = {
        term: 202036,
        max: 10
      }
      assert.rejects(lib.classSearch.call(this.context, incompleteArgs), Error('Must provide term and subject'));
    });

    it('Should not return NULL', function(){
      assert.strict(this.cache.classSearch.data);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.classSearch.data.length > 0);
    });
  });

  /**
   * CATALOGSEARCH()
   */
  describe('#catalogSearch(term, subject)', function () {
    before(async function(){
      this.context = this.test.parent.parent.ctx;
      this.cache = this.context.cache;
      this.params = {
        term: 202036,
        subject: 'CIS',
        offset: Math.ceil(Math.random() * Math.floor(5)),
        pageSize: 25
      };
      try {
        this.cache.catalogSearch = await lib.catalogSearch.call(this.context, ...Object.values(this.params));
      } catch (error) {
        console.error(error);
        this.cache.catalogSearch = error;
      }
    });

    it('Should throw an error when a term and subject are not passed', function () {
      assert.rejects(lib.catalogSearch(), Error('Must provide term and subject'));
    });

    it('Should not return NULL', function(){
      assert.strict(this.cache.catalogSearch);
    });

    it('Should return a non-empty array', function () {
      assert.strict(this.cache.catalogSearch.data.length > 0);
    });
  });

  // /**
  //  * GETALLCOURSES()
  //  */
  // describe('#getAllCourses()', function () {
  //   this.timeout(30000);

  //   before(async () => {
  //     cache.courses = await lib.getAllCourses(term);
  //   });

  //   it('Should throw an error when a term is not passed', function () {
  //     assert.rejects(async () => await lib.getAllCourses(), Error, 'Must provide term');
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