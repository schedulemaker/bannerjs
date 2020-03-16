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
async function getCookie(school, term){

    let res = await bannerRequest(school, 'getCookie', {'term': term});
    return res.Response.headers['set-cookie'];
}

async function bannerRequest(school, method, params={}, needsCookie=false){
    let cookie = needsCookie ? getCookie(school, params.term) : null;
    const options = {
        method: 'GET',
        hostname: config[school][host],
        path: config.global.basePath + methods[method][path] + '?' + querystring.stringify(params),
        port: 443,
        headers: {
            'Cookie': await cookie    
        }
    };
    return await promiseRequest(options);
}

/**
 * Promise wrapper for HTTPS.get
 * @private
 * @param {string} url The URL to send the request to
 * @returns {Promise<{Response: IncomingMessage, Body}>} A Promise containing the response object and parsed body as JSON
 */
async function promiseRequest(url){
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

async function batchRequest(batchSize, pageSize, requestParams={}, method, school){
    const idxs = [...Array(batchSize / pageSize).keys()];
    let res = await Promise.all(idxs.map(async idx => {
        const params = {
            offset: ++idx,
            max: pageSize,
            ...requestParams
        };
        return bannerRequest(school, method, params);
    }));
    return res.map(obj => obj.Data).flat();
}

/**
 * @exports
 */
module.exports = {
    async getTerms(offset=1, max=-1){
        let res = await bannerRequest(this.School, 'getTerms', {offset: offset, max: max});
        return res.Data;
    },

    async getSubjects(term, offset=1, max=-1){
        if (arguments.length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }

        let res = await bannerRequest(this.School, 'get_subject', {offset: offset, max: max, term: term});
        return res.Data;
    },
    
    async getInstructors(term){
        if (arguments.length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }
        let instructors = [];
        let results = -1;
        do {
            results = await batchRequest(config.global.batchSizes.instructors, config.global.pageSizes.instructors, {term: term}, 'get_instructor', this.School);
            instructors.push(...results);
        } while (instructors.length > 0 && results.length == config.global.batchSizes.instructors);
        
        return instructors;
    },
    
    async getCampus(){         
        let res = await bannerRequest(this.School, 'get_campus');
        return res.Data;
    },
    
    async getColleges(){
        let res = await promiseRequest(this.School, 'get_college');
        return res.Data;
    },
    
    async getAttributes(){           
        let res = await promiseRequest(this.School, 'get_attribute');
        return res.Data;
    },
    
    async classSearch(term, subject, pageSize=-1, offset=0, openOnly=false){
        if (arguments.length < 2){
            throw new Error('Must provide term and subject');
        }
        const params = {
            txt_subject: subject,
            txt_term: term,
            pageOffset: offset,
            pageMaxSize: pageSize,
            chk_open_only: openOnly ? true : ''
        };

        let res = await bannerRequest(this.School, 'searchResults', params, true);
        return res.Data.data;
    },
    
    async catalogSearch(term, subject, offset=0, pageSize=-1){
        if (arguments.length < 2){
            throw new Error('Must provide term and subject');
        }
        const params = {
            txt_subject: subject, 
            txt_term: term, 
            pageOffset: offset, 
            pageMaxSize: pageSize
        };
        let res = await bannerRequest(this.School, 'courseSearchResults', params, true);
        return res.Data.data;
    },
}