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

  /**
   * CONSTRUCTOR
   */
  describe('#constructor(school)', function () {
    it('Should throw an error when a school is not passed', function () {
      assert.throws(() => new Banner(), Error, 'Must provide school');
    });
  });

  /**
   * _INIT()
   */
  describe('#_init()', function () {
    it('Should set Banner.Cookie value', async function () {
      let b = new Banner(school);
      await b._init(term);
      assert.strict(banner.Cookie);
    });
  });

  /**
   * SETUP
   */
  var banner = new Banner(school);

  /**
   * GET_TERMS()
   */
  describe('#getTerms()', function () {
    it('Should not throw an error', async function () {
      assert.doesNotReject(banner.getTerms());
    });

    it('Should not return void', async function () {
      assert.strict(await banner.getTerms());
    });

    it('Should return a non-empty array', async function () {
      let terms = await banner.getTerms();
      assert.strict(terms.length > 0);
    });
  });

  /**
   * GETSUBJECTS()
   */
  describe('#getSubjects()', function () {
    it('Should throw an error when a term is not passed', function () {
      assert.rejects(() => banner.getSubjects(), Error, 'Must provide term');
    });

    it('Should not return void', async function () {
      assert.strict(await banner.getSubjects(term));
    });

    it('Should return a non-empty array', async function () {
      let terms = await banner.getSubjects(term);
      assert.strict(terms.length > 0);
    });
  });

  /**
   * GETCAMPUS()
   */
  describe('#getCampus()', function () {
    it('Should not throw an error', async function () {
      assert.doesNotReject(banner.getCampus());
    });

    it('Should not return void', async function () {
      assert.strict(await banner.getCampus());
    });

    it('Should return a non-empty array', async function () {
      let terms = await banner.getCampus();
      assert.strict(terms.length > 0);
    });
  });

  /**
   * GETCOLLEGES()
   */
  describe('#getColleges()', function () {
    it('Should not throw an error', async function () {
      assert.doesNotReject(banner.getColleges());
    });

    it('Should not return void', async function () {
      assert.strict(await banner.getColleges());
    });

    it('Should return a non-empty array', async function () {
      let terms = await banner.getColleges();
      assert.strict(terms.length > 0);
    });
  });

  /**
   * GETATTRIBUTES()
   */
  describe('#getAttributes()', function () {
    it('Should not throw an error', async function () {
      assert.doesNotReject(banner.getAttributes());
    });

    it('Should not return void', async function () {
      assert.strict(await banner.getAttributes());
    });

    it('Should return a non-empty array', async function () {
      let terms = await banner.getAttributes();
      assert.strict(terms.length > 0);
    });
  });

  /**
   * GETINSTRUCTORS()
   */
  describe('#getInstructors()', function () {
    this.timeout(15000);
    var data = null;
    it('Should throw an error when a term is not passed', function () {
      assert.rejects(() => banner.getInstructors(), Error, 'Must provide term');
    });

    it('Should not return void', async function () {
      data = await banner.getInstructors(term);
      assert.strict(data);
    });

    it('Should return a non-empty array', function () {
      assert.strict(data.length > 0);
    });
  });

  /**
   * CLASS_SEARCH()
   */
  describe('#classSearch(subjects)', function () {
    this.timeout(30000);
    var data = null;
    it('Should throw an error when a subject and term are not passed', function () {
      assert.rejects(async () => banner.classSearch, Error, 'Must provide term and subject');
    });

    it('Should not return NULL', async function(){
      data = await banner.classSearch(term, 'CIS');
      assert.strict(data);
    });

    it('Should return a non-empty array', function () {
      assert.strict(data.length > 0);
    });
  });

  /**
   * CATALOGSEARCH()
   */
  describe('#catalogSearch(subjects)', function () {
    this.timeout(30000);
    var data = null;
    it('Should throw an error when a term and subject are not passed', function () {
      assert.rejects(async () => banner.catalogSearch, Error, 'Must provide term and subject');
    });

    it('Should not return NULL', async function(){
      data = await banner.catalogSearch(term, 'CIS');
      assert.strict(data);
    });

    it('Should return a non-empty array', function () {
      assert.strict(data.length > 0);
    });
  });

  /**
   * GETALLCOURSES()
   */
  describe('#getAllCourses()', function () {
    this.timeout(30000);
    var data = null;
    it('Should throw an error when a term is not passed', function () {
      assert.rejects(() => banner.getAllCourses(), Error, 'Must provide term');
    });

    it('Should not return NULL', async function(){
      data = await banner.getAllCourses(term);
      assert.strict(data);
    });

    it('Should return a non-empty array', function () {
      assert.strict(data.length > 0);
    });
  });
});
