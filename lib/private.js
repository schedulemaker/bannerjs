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
        hostname: config.schools[school].host,
        path: config.global.basePath + methods[method].path + '?' + querystring.stringify(params),
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
module.exports = {promiseRequest, bannerRequest, getCookie, batchRequest};