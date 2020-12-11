const classConstructor = require("./suite/constructor");
const makeDoc = require("./suite/makeDoc");
const createOne = require("./suite/createOne");

describe("ControllerSchema", function() {

    const addDesc = ( name, suite ) => describe(name, suite.bind(this));

    addDesc( "constructor()", classConstructor );
    addDesc( "makeDoc()", makeDoc );
    addDesc( "createOne()", createOne );

});