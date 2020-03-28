'use strict';

var assert = require('assert');
var querystring = require('querystring');
var lib = require('../lib/private');
var config = require('../lib/config');
var methods = require('../lib/methods');

describe('banner/lib.private', function(){

  /**
   * SETUP
   */
  before(function(){
    this.cache = {};
  });

  /**
   * PROMISEREQUEST()
   */
  describe('#promiseRequest(options)', function(){
    before(async function(){
      this.cache = this.test.parent.parent.ctx.cache;
      this.httpOptions = {
        hostname: 'postman-echo.com',
        path: '/get' + '?' + querystring.stringify({foo: 'bar'})
      };
      try {
        this.cache.promiseRequest = await lib.promiseRequest(this.httpOptions);
      } catch (error) {
        console.error(error);
        this.cache.promiseRequest = error;
      }
    });

    it('Should return 200 status code', function(){
      assert.strictEqual(this.cache.promiseRequest.Response.statusCode, 200);
    });

    it('Should return headers and body as JSON', function(){
      assert.strictEqual(typeof(this.cache.promiseRequest.Response), 'object');
      assert.strictEqual(typeof(this.cache.promiseRequest.Body), 'object');
    });
  });

  /**
   * BANNER_REQUEST()
   */
  describe('#bannerRequest(school, method, params={}, needsCookie=false)', function(){
    before(function(){
      this.school = 'temple';
      this.method = 'get_campus';
      this.cache = this.test.parent.parent.ctx.cache;
      this.cache.bannerRequest = {};
    });

    [{}, {foo: 'bar'}].forEach(params => {
      [true, false].forEach(needsCookie => {
        var comboString = `params={${Object.keys(params).map(key => `${key}:${params[key]}`)}}:needsCookie=${needsCookie}`;
        describe(comboString, function(){
          it('Should construct HTTPOptions correctly', async function(){
            this.context = this.test.parent.parent.ctx;
            this.context.cache.bannerRequest[comboString] = await lib.bannerRequest(this.context.school, this.context.method, params, needsCookie);
            assert.strictEqual(this.context.cache.bannerRequest[comboString].Response.req.socket._host, config.schools[this.school].host);
            assert.strictEqual(this.context.cache.bannerRequest[comboString].Response.req.method, 'GET');
            assert.strictEqual(this.context.cache.bannerRequest[comboString].Response.req.path, config.global.basePath + methods[this.method].path + '?' + querystring.stringify(params));
          });
        });
      });
    });
  });

    /**
   * GETCOOKIE()
   */
  describe('#getCookie(school, term)', function () {
    before(async function(){
      this.cache = this.test.parent.parent.ctx.cache;
      this.cache.getCookie = await lib.getCookie('temple', 202036);
    });

    it('Should return cookie value', function () {
      assert.strict(this.cache.getCookie.length === 2);
      assert.strict(this.cache.getCookie[0].startsWith('JSESSIONID'));
      assert.strict(this.cache.getCookie[1].startsWith('BIGipServer'));
    });
  });

  /**
   * BATCHREQUEST()
   */
  describe('#batchRequest(batchSize, pageSize, requestParams={}, method, school)', function(){
    before(function(){
      this.cache = this.test.parent.parent.ctx.cache;
      this.cache.batchRequest = {};
      this.method = 'get_instructor';
      this.school = 'temple';
    });

    [[10,10],[10,100]].forEach(([batchSize, pageSize]) => {
      describe(`${batchSize}:${pageSize}`, function(){
        it('Should throw an error with mismatched batch and page sizes', async function(){
          this.context = this.test.parent.parent.ctx;
          assert.rejects(async () => await lib.batchRequest(batchSize, pageSize, {term: 202036}, this.context.method, this.context.school), Error, 'Batch size must be greater than page size');
        });
      });
    });
  
    [[100,10],[1000,10],[1000,100]].forEach(([batchSize, pageSize]) => {
      describe(`${batchSize}:${pageSize}`, function(){
        it('Should return a single depth array', async function(){
          this.context = this.test.parent.parent.ctx;
          let keyString = `${batchSize}:${pageSize}`;
          this.context.cache.batchRequest[keyString] = await lib.batchRequest(batchSize, pageSize, 0, {term: 202036}, this.context.method, this.context.school);
          assert.strict(this.context.cache.batchRequest[keyString].every(val => val[0] === undefined));
        });
      });
    });
  });
});