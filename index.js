/*jshint esversion: 8*/
'use strict';

const https = require('https');
const querystring = require('querystring');
const config = require('./config/global');

/**
 * @class Class to interact with the SSB Server
 */
class Banner {
    constructor(school){
        if (arguments.length < 1 || school === undefined || school === null){
            throw new Error('Must provide school name');
        }
        this.School = require(`./config/${school}`);
        this.SessionId = Date.now();
        //Set server for first classSearch
        this.reset = this._init();
    }

    async _init(){
        const data = querystring.stringify({
            'uniqueSessionId': this.SessionId,
            'term': this.Term
        });

        const options = {
            method: 'POST',
            hostname: this.School.host,
            path: config.basePath + '/term/search',
            port: 443,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'      
            }
        };

        let res = await promiseRequest(options, data);
        this.Cookie = res.Response.headers['set-cookie'];
    }

    async getTerms(){
        const path = '/classSearch/getTerms';
        const params = querystring.stringify({
            offset: 1,
            max: -1
        });
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}?${params}`,
            port: 443
        };
            
        let res = await promiseRequest(options);
        return res.Data;
    }

    async getSubjects(){
        const path = '/classSearch/get_subject';
        const params = querystring.stringify({
            offset: 1,
            max: -1,
            term: this.Term
        });
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}?${params}`,
            port: 443
        };
            
        let res = await promiseRequest(options);
        return res.Data;
    }

    async getInstructors(){
        const path = '/classSearch/get_instructor';
        const idxs = [...Array(this.School.instrMax / config.pageSizes.instructors).keys()].map(i => i + 1);
        let res = await Promise.all(idxs.map(async idx => {
            const params = querystring.stringify({
                offset: idx,
                max: config.pageSizes.instructors,
                term: this.Term
            });
            const options = {
                method: 'GET',
                hostname: this.School.host,
                path: `${config.basePath}${path}?${params}`,
                port: 443
            };
            return promiseRequest(options);
        }));
        
        return res.map(obj => obj.Data).flat();
    }

    async getCampus(){
        const path = '/classSearch/get_campus';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}`,
            port: 443
        };
            
        let res = await promiseRequest(options);
        return res.Data;
    }

    async getColleges(){
        const path = '/classSearch/get_college';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}`,
            port: 443
        };
            
        let res = await promiseRequest(options);
        return res.Data;
    }

    async getAttributes(){
        const path = '/classSearch/get_attribute';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}`,
            port: 443
        };
            
        let res = await promiseRequest(options);
        return res.Data;
    }

    async classSearch(subject, openOnly=false){
        if (arguments.length < 1){
            throw new Error('Must provide subject');
        }
        const path = '/searchResults';
        let params = {
            txt_subject: subject,
            txt_term: this.Term,
            pageOffset: 0,
            pageMaxSize: -1,
            uniqueSessionId: this.SessionId
        };
        if (openOnly) params.chk_open_only = true;
        params = querystring.stringify(params);

        await this.reset;
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}?${params}`,
            port: 443,
            headers: {
                'Cookie': this.Cookie     
            }
        };
        
        let res = await promiseRequest(options);
        //Reset server for next classSearch
        this.reset = this._init();
        return res.Data.data;
    }

    async catalogSearch(subject){
        if (arguments.length < 1){
            throw new Error('Must provide subject');
        }
        const path = '/courseSearchResults';
        let params = {
            txt_subject: subject,
            txt_term: this.Term,
            pageOffset: 0,
            pageMaxSize: -1,
            uniqueSessionId: this.SessionId
        };
        params = querystring.stringify(params);

        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${config.basePath}${path}?${params}`,
            port: 443,
            headers: {
                'Cookie': this.Cookie     
            }
        };
        await this.reset;
        let res = await promiseRequest(options);
        //Reset server for next classSearch
        this.reset = this._init();
        return res.Data.data;
    }

    async getAllCourses(){
        let subjects = (await this.getSubjects()).map(subj => subj.code);
        let courses = await Promise.all(subjects.map(async subj => this.catalogSearch(subj)));
        return courses.flat();
    }
}

/**
 * Promise wrapper for HTTPS.request
 * @param {HttpOptions} options 
 * @param {Object} data 
 */
async function promiseRequest(options, data=null){
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('error', (err) => reject(err));
            res.on('end', () => resolve({
                'Response': res, 
                'Data': JSON.parse(body)
            }));
        });

        req.on('error', (err) => reject(err));
        if (options.method == 'POST'){
            req.write(data);
        }
        req.end();
    });
}

module.exports = Banner;
