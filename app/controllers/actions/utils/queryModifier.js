/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Query} Query
 */

const modifierMap = {
    populate: ( query, populations ) => {

        for( populateParams of populations )
            
            query.populate( ...(Array.isArray( populateParams ) ? populateParams : [populateParams]) );

    }
}

/**
 * @typedef QueryModifierOptions
 * @property {Array} populate - A list of populate configurations.
 * 
 * @param {Query} query 
 * @param {QueryModifierOptions} options 
 * @returns {Query}
 */
const queryModifier = ( query, options = {} ) => {

    for( [key, value] of  Object.entries( options ) ) {

        if( !modifierMap.hasOwnProperty(key) ) continue;

        modifierMap[key]( query, value );

    };

    return query;

 }

 module.exports = queryModifier;