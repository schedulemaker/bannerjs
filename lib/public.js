'use strict';


const config = require('./config');
const{ 
    bannerRequest, 
    batchRequest 
} = require('./private');

/**
 * @exports
 */
module.exports = {
    async getTerms({offset=1, max=-1}){
        let res = await bannerRequest(this.School, 'getTerms', {offset: offset, max: max});
        return res.Body;
    },

    async getSubjects({term, offset=1, max=-1}){
        if (Object.keys(arguments[0]).length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }

        let res = await bannerRequest(this.School, 'get_subject', {offset: offset, max: max, term: term});
        return res.Body;
    },
    
    async getInstructors({term}){
        if (Object.keys(arguments[0]).length < 1 || term === undefined || term === null){
            throw new Error('Must provide term');
        }
        let instructors = [];
        let results = -1;
        let batch = 0;
        do {
            results = await batchRequest(config.global.batchSizes.instructors, config.global.pageSizes.instructors,
                batch, {term: term}, 'get_instructor', this.School);
            instructors.push(...results);
            batch++;
        } while (instructors.length > 0 && results.length === config.global.batchSizes.instructors);
        
        return instructors;
    },
    
    async getCampus(){         
        let res = await bannerRequest(this.School, 'get_campus');
        return res.Body;
    },
    
    async getColleges(){
        let res = await bannerRequest(this.School, 'get_college');
        return res.Body;
    },
    
    async getAttributes(){           
        let res = await bannerRequest(this.School, 'get_attribute');
        return res.Body;
    },

    async getSessions(){
        let res = await bannerRequest(this.School, 'get_session');
        return res.Body;
    },

    async getPartsOfTerm(){
        let res = await bannerRequest(this.School, 'get_partOfTerm');
        return res.Body;
    },

    async getInstructionalMethods(){
        let res = await bannerRequest(this.School, 'get_instructionalMethod');
        return res.Body;
    },

    async getCourseDescription({term, crn}){
        if (Object.keys(arguments[0]).length < 2){
            throw new Error('Must provide term and CRN');
        }
        let res = await bannerRequest(this.School, 'getCourseDescription', {term: term, courseReferenceNumber: crn});
        return res.Body.slice(4, -5); //Remove <p> tag from returned HTML
    },
    
    async classSearch({term, subject, pageSize=-1, offset=0, openOnly=false}){
        if (Object.keys(arguments[0]).length < 2){
            throw new Error('Must provide term and subject');
        }
        const params = {
            txt_subject: subject,
            term: term,
            txt_term: term,
            pageOffset: offset,
            pageMaxSize: pageSize,
            chk_open_only: openOnly ? true : ''
        };

        let res = await bannerRequest(this.School, 'searchResults', params, true);
        return res.Body;
    },
    
    async catalogSearch({term, subject, offset=0, pageSize=-1}){
        if (Object.keys(arguments[0]).length < 2){
            throw new Error('Must provide term and subject');
        }
        const params = {
            txt_subject: subject, 
            txt_term: term,
            term: term, 
            pageOffset: offset, 
            pageMaxSize: pageSize
        };
        let res = await bannerRequest(this.School, 'courseSearchResults', params, true);
        return res.Body;
    }
}