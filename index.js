/*jshint esversion: 8*/
'use strict';

const config = require('./config');

/**
 * @class Class to interact with the SSB Server
 */
class Banner {
    constructor(school){
        if (arguments.length < 1 || school === undefined || school === null){
            throw new Error('Must provide school name');
        }

        if (config[school] === undefined){
            throw new Error('Invalid school');
        }
        this.School = config[school];
        this.BasePath = config.global.basePath;
        this.PageSizes = config.global.pageSizes;
    }
}

module.exports = Banner;
