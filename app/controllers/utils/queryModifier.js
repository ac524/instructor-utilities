/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Query} Query
 */

 /**
  * @param {Query} query 
  * @param {Array} populations 
  */
const populateMod = ( query, populations ) => {

    for( populateParams of populations )
        
        query.populate( ...(Array.isArray( populateParams ) ? populateParams : [populateParams]) );

};

/**
 * @param {Query} query 
 * @param {Array} populations 
 */
const selectMod = ( query, select ) => {

    query.select( select );

}

const modifierMap = {
    populate: populateMod,
    select: selectMod
}

/**
 * @typedef QueryModifierOptions
 * @property {Array} populate - A list of populate configurations.
 * @property {string} select - A string of member names to select.
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