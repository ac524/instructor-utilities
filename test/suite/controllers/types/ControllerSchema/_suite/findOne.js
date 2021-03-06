const { expect } = require("chai");
const { createSandbox } = require("sinon");

const { Types, Query } = require("mongoose");
const { ObjectId } = Types;

const TestModel = require("~crsmtest/lib/TestModel");
const createMakeCtrl = require("../_utils/createMakeCtrl");

module.exports = function() {

    const sandbox = createSandbox();

    const makeCtrl = createMakeCtrl(sandbox);

    before(() => {
        sandbox.stub( TestModel, "findById" ).callsFake(()=>new Query);
        sandbox.stub( TestModel, "findOne" ).callsFake(()=>new Query);
    });

    afterEach(() => {
        TestModel.findById.resetHistory();
        TestModel.findOne.resetHistory();
    });

    after(() => sandbox.restore());

    describe("By `docId`", () => {
    
        it( "should call the model's `findById` method", () => {
    
            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
    
            // Act
            ctrl.findOne( { docId } );
    
            // Assert
            expect( TestModel.findById.calledWithExactly(docId) ).to.be.true;
    
        });

        it( "should be call the `query` method with a `Query` and provided `queryOptions`", () => {

            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const queryOptions = { select: "name" };

            // Act
            ctrl.findOne( { docId }, queryOptions );

            // Assert
            expect( ctrl.query.getCall(0).args[0] ).to.be.instanceof( Query );
            expect( ctrl.query.args[0][1] ).to.equal( queryOptions );

        });
    
        it( "should return a `Document` when passed an existing `docId`", async () => {
    
            // Arrange
            const ctrl = makeCtrl();
            const doc = new TestModel({name: "A test"});
            const docId = doc._id;
    
            ctrl.query.callsFake(() => doc);
    
            // Act
            const foundDoc = await ctrl.findOne( { docId } );
    
            // Assert
            expect( foundDoc ).to.equal( doc );
    
        });
    
    });

    describe("By `search`", () => {

        it( "should call the model's `findOne` method with `search` when provided", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };

            // Act
            ctrl.findOne( { search } );

            // Assert
            expect( TestModel.findOne.calledWithExactly(search) ).to.be.true;

        });

        it( "should be call the `query` method with a `Query` and provided `queryOptions`", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };
            const queryOptions = { select: "name" };

            // Act
            ctrl.findOne( { search }, queryOptions );

            // Assert
            expect( ctrl.query.getCall(0).args[0] ).to.be.instanceof( Query );
            expect( ctrl.query.args[0][1] ).to.equal( queryOptions );

        });

        it( "should return a `Document` when passed a `search` for an existing document", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const doc = new TestModel({name: "A test"});
            const search = { name: doc.name };

            ctrl.query.callsFake(() => doc);

            // Act
            const foundDoc = await ctrl.findOne( { search } );

            // Assert
            expect( foundDoc ).to.equal( doc );

        });

    });

    describe("Priority `docId` > than `search`", () => {

        it( "should call the model's findById method if provided a `docId` and `search`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const search = { name: "A test" };

            // Act
            ctrl.findOne( { docId, search } );

            // Assert
            expect( TestModel.findById.calledOnce ).to.be.true;

        });

        it( "should not call the model's findOne method if provided a `docId` and `search`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const search = { name: "A test" };

            // Act
            ctrl.findOne( { docId, search } );

            // Assert
            expect( TestModel.findOne.calledOnce ).to.be.false;

        });

    });

};