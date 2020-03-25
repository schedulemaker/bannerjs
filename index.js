'use strict';

const config = require('./lib/config');
const methods = require('./lib/methods');
const lib = require('./lib');

/**
 * @class Class to interact with the SSB Server
 */
class Banner {
    /**
     * @constructor
     * @param {string} school The school name as given from the list of supported schools
     * @returns {Banner} A Banner object exposing the methods available for the given school
     */
    constructor(school){
        if (arguments.length < 1 || school === undefined || school === null){
            throw new Error('Must provide school');
        }

        if (config.schools[school] === undefined){
            throw new Error(`Unsupported school "${school}"`);
        }

        this.School = school;
        
        config.schools[school].methods.forEach(method => {
            this[methods[method].displayName] = lib[methods[method].displayName]
        });
    }
}

module.exports = Banner;
