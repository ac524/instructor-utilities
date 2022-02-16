const useDescribe = require("~crsmtest/lib/useDescribe");

const classConstructor = require("./_suite/constructor");
const makeDoc = require("./_suite/makeDoc");
const createOne = require("./_suite/createOne");
const deleteOne = require("./_suite/deleteOne");
const findOne = require("./_suite/findOne");
const findMany = require("./_suite/findMany");
const updateOne = require("./_suite/updateOne");


const describe = useDescribe(this);

describe("ControllerSchema", function() {

    const describe = useDescribe(this);

    describe( "constructor()", classConstructor );
    describe( "makeDoc()", makeDoc );
    describe( "createOne()", createOne );
    describe( "deleteOne()", deleteOne );
    describe( "findOne()", findOne );
    describe( "findMany()", findMany);
    describe( "updateOne()", updateOne );

});