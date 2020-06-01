const ListItem = require( "../../../resources/js/lists/models/ListItem");

// const test = require( "../../../resources/js/lists/models/Test");

console.log( new ListItem() );

describe( "ListItem", () => {

    describe("Intialization", () => {

        it("should pass", () => {

            expect(true).toEqual(true);

        });

    });

} )