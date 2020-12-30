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

        it( "should call the `query` method with a `Query` when provided `queryOptions`", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };
            const queryOptions = { select: "name" };

            // Act
            ctrl.findMany( { search }, queryOptions );

            // Assert
            expect( ctrl.query.getCall(0).args[0] ).to.be.instanceof( Query );
            expect( ctrl.query.args[0][1] ).to.equal( queryOptions );

        });

    });

}