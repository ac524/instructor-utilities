const { expect } = require("chai");
const { createSandbox } = require("sinon");

const { Types, Query, Document } = require("mongoose");
const { ObjectId } = Types;

const TestModel = require("~crsmtest/lib/TestModel");
const createMakeCtrl = require("~crsmtest/lib/createMakeCtrl");

const createMakeDoc = sandbox => data => {

    const doc = new TestModel(data);

    sandbox.stub(doc, "update");

    return doc;

}

module.exports = function() {
    
    const sandbox = createSandbox();

    const makeCtrl = createMakeCtrl(sandbox);
    const makeDoc = createMakeDoc(sandbox);

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
            const doc = makeDoc({ name: "A test" });
            const data = { name: "An update test" };

            // Act
            ctrl.updateOne( { doc, data } );

            // Assert
            expect( doc.update.calledWithExactly( data ) ).to.be.true;

        });

        it("should return the updated `doc`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const doc = makeDoc({ name: "A test" });
            const data = { name: "An update test" };

            doc.update.callsFake( update => {
                doc.name = update.name;
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

    describe("By `search`", () => {

        it("should be call the `query` method with a `Query` and provided `queryOptions`", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };
            const queryOptions = { select: "name" };

            // Act
            ctrl.updateOne( { search }, queryOptions );

            // Assert
            expect( ctrl.query.getCall(0).args[0] ).to.be.instanceof( Query );
            expect( ctrl.query.args[0][1] ).to.equal( queryOptions );

        });

        it("should call the model's `findOneAndUpdate` method with expected params", () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };
            const data = { name: "A new test" };

            // Act
            ctrl.updateOne( { search, data } );

            // Assert
            expect( TestModel.findOneAndUpdate.calledWithExactly( search, data, { new: true } ) ).to.be.true;

        });

        it( "should return the updated `Document`", async () => {

            // Arrange
            const ctrl = makeCtrl();
            const search = { name: "A test" };
            const data = { name: "A new test" };
            const doc = new TestModel( data );
    
            ctrl.query.callsFake(() => doc);

            // Act
            const updatedDoc = await ctrl.updateOne( { search, data } );

            // Assert
            expect( updatedDoc ).to.be.instanceof( Document );
            expect( updatedDoc ).to.include( data );

        });

    });

    describe("Priority `doc` > than `docId` and `search`", () => {

        const getArrangement = () => {
            return {
                ctrl: makeCtrl(),
                doc: makeDoc(),
                search: { name: "A test" },
                docId: new ObjectId(),
                data: { name: "A new test" }
            }
        }

        it( "should call the document's update method if provided a `doc`, `docId` and `search`", async () => {

            // Arrange
            const {
                ctrl,
                doc,
                search,
                docId,
                data
            } = getArrangement();

            // Act
            await ctrl.updateOne( { doc, docId, search, data } );

            // Assert
            expect( doc.update.calledOnce ).to.be.true;

        });

        it( "should not call the model's `findByIdAndUpdate` method if provided a `doc`, `docId` and `search`", async () => {

            // Arrange
            const {
                ctrl,
                doc,
                search,
                docId,
                data
            } = getArrangement();

            // Act
            await ctrl.updateOne( { doc, docId, search, data } );

            // Assert
            expect( TestModel.findByIdAndUpdate.calledOnce ).to.be.false;

        });

        it( "should not call the model's `findOneAndUpdate` method if provided a `doc`, `docId` and `search`", async () => {

            // Arrange
            const {
                ctrl,
                doc,
                search,
                docId,
                data
            } = getArrangement();

            // Act
            await ctrl.updateOne( { doc, docId, search, data } );

            // Assert
            expect( TestModel.findOneAndUpdate.calledOnce ).to.be.false;

        });

    });

    describe("Priority `docId` > than `search`", () => {

        const getArrangement = () => {
            return {
                ctrl: makeCtrl(),
                search: { name: "A test" },
                docId: new ObjectId(),
                data: { name: "A new test" }
            }
        }

        it( "should call the model's `findByIdAndUpdate` method if provided a `docId` and `search`", async () => {

            // Arrange
            const {
                ctrl,
                search,
                docId,
                data
            } = getArrangement();

            // Act
            await ctrl.updateOne( { docId, search, data } );

            // Assert
            expect( TestModel.findByIdAndUpdate.calledOnce ).to.be.true;

        });

        it( "should not call the model's `findOneAndUpdate` method if provided a `docId` and `search`", async () => {

            // Arrange
            const {
                ctrl,
                search,
                docId,
                data
            } = getArrangement();

            // Act
            await ctrl.updateOne( { docId, search, data } );

            // Assert
            expect( TestModel.findOneAndUpdate.calledOnce ).to.be.false;

        });
        
    });

}