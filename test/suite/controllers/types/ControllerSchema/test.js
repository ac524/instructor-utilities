const classConstructor = require("./_suite/constructor");
const makeDoc = require("./_suite/makeDoc");
const createOne = require("./_suite/createOne");
const deleteOne = require("./_suite/deleteOne");
const findOne = require("./_suite/findOne");
const updateOne = require("./_suite/updateOne");

describe("ControllerSchema", function() {

    const addDesc = ( name, suite ) => describe(name, suite.bind(this));

    addDesc( "constructor()", classConstructor );
    addDesc( "makeDoc()", makeDoc );
    addDesc( "createOne()", createOne );
    addDesc( "deleteOne()", deleteOne );
    addDesc( "findOne()", findOne );
    addDesc( "updateOne()", updateOne );

});