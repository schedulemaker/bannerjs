'use strict';

const https = require('https');
const querystring = require('querystring');
const methods = require('./methods');
const config = require('./config');

/**
 * Gets a cookie from the Banner server
 * @private
 * @param {number | string} term A valid term code
 * @returns {Promise<string[]>} A Promise containing the cookie returned by the server
 */
async function getCookie(term){
    const params = querystring.stringify({
        'term': term
    });

    const options = {
        method: 'POST',
        hostname: this.School.host,
        path: this.BasePath + '/term/search' + params,
        port: 443
    };

    let res = await bannerRequest(options);
    return res.Response.headers['set-cookie'];
}

/**
 * Promise wrapper for HTTPS.get
 * @private
 * @param {string} url The URL to send the request to
 * @returns {Promise<{Response: IncomingMessage, Body}>} A Promise containing the response object and parsed body as JSON
 */
async function bannerRequest(url){
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('error', (err) => reject(err));
            res.on('end', () => resolve({
                'Response': res, 
                'Body': JSON.parse(body)
            }));
        }).on('error', (err) => reject(err));
    });
}

/**
 * @exports
 */
module.exports = {
    async getTerms(){
        const path = '/classSearch/getTerms';
        const params = querystring.stringify({
            offset: 1,
            max: -1
        });
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}?${params}`,
            port: 443
        };
            
        let res = await bannerRequest(`https://`);
        return res.Data;
    },

    async getSubjects(term){
        if (arguments.length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }
        const path = '/classSearch/get_subject';
        const params = querystring.stringify({
            offset: 1,
            max: -1,
            term: term
        });
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}?${params}`,
            port: 443
        };
            
        let res = await bannerRequest(options);
        return res.Data;
    },
    
    async getInstructors(term){
        if (arguments.length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }
        const path = '/classSearch/get_instructor';
        const idxs = [...Array(this.School.instrMax / this.PageSizes.instructors).keys()];
        let res = await Promise.all(idxs.map(async idx => {
            const params = querystring.stringify({
                offset: ++idx,
                max: this.PageSizes.instructors,
                term: term
            });
            const options = {
                method: 'GET',
                hostname: this.School.host,
                path: `${this.BasePath}${path}?${params}`,
                port: 443
            };
            return bannerRequest(options);
        }));
        
        return res.map(obj => obj.Data).flat();
    },
    
    async getCampus(){
        const path = '/classSearch/get_campus';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}`,
            port: 443
        };
            
        let res = await bannerRequest(options);
        return res.Data;
    },
    
    async getColleges(){
        const path = '/classSearch/get_college';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}`,
            port: 443
        };
            
        let res = await bannerRequest(options);
        return res.Data;
    },
    
    async getAttributes(){
        const path = '/classSearch/get_attribute';
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}`,
            port: 443
        };
            
        let res = await bannerRequest(options);
        return res.Data;
    },
    
    async classSearch(term, subject, openOnly=false){
        if (arguments.length < 2){
            throw new Error('Must provide term and subject');
        }
        let cookie = this._reset(term);
        const path = '/searchResults';
        let params = {
            txt_subject: subject,
            txt_term: term,
            pageOffset: 0,
            pageMaxSize: -1
        };
        if (openOnly) params.chk_open_only = true;
        params = querystring.stringify(params);
    
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}?${params}`,
            port: 443,
            headers: {
                'Cookie': await cookie    
            }
        };
        
        let res = await bannerRequest(options);
        return res.Data.data;
    },
    
    async catalogSearch(term, subject){
        if (arguments.length < 2){
            throw new Error('Must provide term and subject');
        }
        let cookie = this._reset(term);
        const path = '/courseSearchResults';
        let params = {
            txt_subject: subject,
            txt_term: term,
            pageOffset: 0,
            pageMaxSize: -1
        };
        params = querystring.stringify(params);
    
        const options = {
            method: 'GET',
            hostname: this.School.host,
            path: `${this.BasePath}${path}?${params}`,
            port: 443,
            headers: {
                'Cookie': await cookie     
            }
        };
        let res = await bannerRequest(options);
        return res.Data.data;
    },
    
    async getAllCourses(term){
        if (arguments.length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }
        let subjects = (await this.getSubjects(term)).map(subj => subj.code);
        let courses = await Promise.all(subjects.map(async subj => this.catalogSearch(term, subj)));
        return courses.flat();
    }
}






