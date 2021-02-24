const classConstructor = require("./_suite/constructor");

describe("Controller", function() {

    const addDesc = ( name, suite ) => describe(name, suite.bind(this));

    addDesc( "constructor()", classConstructor );

});