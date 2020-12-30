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

        it( "should return all matching documents when passed a `search` for existing documents", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const doc1 = new TestModel( { name: "First test" } );
            const doc2 = new TestModel( { name: "Second test" } );
            const doc3 = new TestModel( { name: "Third test" } );
            const search = { name: "test" };

            ctrl.query.callsFake(() => doc1);
            ctrl.query.callsFake(() => doc2);
            ctrl.query.callsFake(() => doc3);

            // Act
            const foundDocs = await ctrl.findMany( { search } );

            // Assert
            expect( foundDocs ).to.equal( doc1, doc2, doc3 );

        });

    });

}