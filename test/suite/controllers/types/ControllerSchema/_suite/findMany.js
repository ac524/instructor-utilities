const { expect } = require("chai");
const { createSandbox } = require("sinon");

const { Query } = require("mongoose");

const TestModel = require("~crsmtest/lib/TestModel");
const createMakeCtrl = require("../_utils/createMakeCtrl");

module.exports = function() {

    const sandbox = createSandbox();

    const makeCtrl = createMakeCtrl(sandbox);

    before(() => {
        sandbox.stub( TestModel, "find" ).callsFake(()=>new Query);
    });

    afterEach(() => {
        TestModel.find.resetHistory();
    });

    after(() => sandbox.restore());

    describe("By `search`", () => {

        it( "should call the model's `find` method with `search` when provided", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };

            // Act
            ctrl.findMany( { search } );

            // Assert
            expect( TestModel.find.calledWithExactly(search) ).to.be.true;

        });

    });

}