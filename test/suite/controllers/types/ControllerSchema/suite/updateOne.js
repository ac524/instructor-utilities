const { expect } = require("chai");
const { createSandbox } = require("sinon");

const { Types, Query, Document } = require("mongoose");
const { ObjectId } = Types;

const TestModel = require("~crsmtest/lib/TestModel");
const createMakeCtrl = require("~crsmtest/lib/createMakeCtrl");

module.exports = function() {
    
    const sandbox = createSandbox();

    const makeCtrl = createMakeCtrl(sandbox);

    before(() => {
        sandbox.stub( TestModel, "findByIdAndUpdate" ).callsFake(()=>new Query);
        sandbox.stub( TestModel, "findOneAndUpdate" ).callsFake(()=>new Query);
    });

    afterEach(() => {
        TestModel.findByIdAndUpdate.resetHistory();
        TestModel.findOneAndUpdate.resetHistory();
    });

    after(() => sandbox.restore());

    describe("By `doc`", () => {

        it("should be call the `doc.update` method with given data", () => {
            
            // Arrange
            const ctrl = makeCtrl();
            const doc = new TestModel({ name: "A test" });
            const data = { name: "An update test" };

            sandbox.stub(doc, "update");

            // Act
            ctrl.updateOne( { doc, data } );

            // Assert
            expect( doc.update.calledWithExactly( data ) ).to.be.true;

        });

        it("should return the updated `doc`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const doc = new TestModel({ name: "A test" });
            const data = { name: "An update test" };

            sandbox.stub(doc, "update").callsFake( update => {
                doc.name = data.name;
                return doc;
            });

            // Act
            const updatedDoc = await ctrl.updateOne( { doc, data } );

            // Assert
            expect( updatedDoc ).to.be.instanceof( Document );
            expect( updatedDoc ).to.include({
                _id: doc._id,
                name: data.name
            });

        });

    });

    describe("By `docId`", () => {

        it("should be call the `query` method with a `Query` and provided `queryOptions`", () => {
            
            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const queryOptions = { select: "name" };

            // Act
            ctrl.updateOne( { docId }, queryOptions );

            // Assert
            expect( ctrl.query.getCall(0).args[0] ).to.be.instanceof( Query );
            expect( ctrl.query.args[0][1] ).to.equal( queryOptions );

        });

        it("should call the model's `findByIdAndUpdate` method with expected params", () => {

            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const data = { name: "A test" };

            // Act
            ctrl.updateOne( { docId, data } );

            // Assert
            expect( TestModel.findByIdAndUpdate.calledWithExactly( docId, data, { new: true } ) ).to.be.true;

        });

        it( "should return the updated `Document`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const docId = new ObjectId();
            const data = { name: "A test" };
            const doc = new TestModel( data );
    
            ctrl.query.callsFake(() => doc);

            // Act
            const updatedDoc = await ctrl.updateOne( { docId, data } );

            // Assert
            expect( updatedDoc ).to.be.instanceof( Document );
            expect( updatedDoc ).to.include( data );

        });

    });

}