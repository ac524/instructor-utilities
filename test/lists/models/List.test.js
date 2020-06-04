import Lists from "../../../resources/js/lists/models/Lists";
import List from "../../../resources/js/lists/models/List";
import ListItem from "../../../resources/js/lists/models/ListItem";

describe( "List", () => {

    // describe("Intialization", () => {

    //     it("should pass", () => {

    //         expect(true).toEqual(true);

    //     });

    // });

    describe("enabled", () => {

        it("should return an array of enabled items", () => {

            const list = new List();

            const item = new ListItem({isDisabled: true});
            const item2 = new ListItem();

            const expected = [item2];

            list.addItem(item).addItem(item2);

            expect(list.enabled).toEqual(expect.arrayContaining(expected));

        });

        it("should return an empty array if no items are in the list", () => {

            const list = new List();
            
            expect(list.enabled).toEqual([]);

        });

    })

    describe( "isComplete", () => {

        it( "should return false if the list is empty", () => {

            const list = new List();

            expect(list.isComplete).toEqual(false);

        } );

        it( "should return false if there are unselected items", () => {

            const list = new List();

            list.addItem( new ListItem ).addItem( new ListItem );

            list.select( 0 );

            expect(list.isComplete).toEqual(false);

        } );

        it( "should return true if all items have been selected", () => {

            const list = new List;

            list.addItem( new ListItem ).addItem( new ListItem );

            list.select( 0 ).select( 1 );

            expect(list.isComplete).toEqual(true);

        } );

    } );

    describe( "belongsTo", () => {

        it( "should be null by default", () => {

            const list = new List;

            expect( list.belongsTo ).toEqual( null );

        } );

        it( "should equal the list collect it is added to", () => {

            const list = new List;
            const lists = new Lists;

            lists.addList( list );

            expect( list.belongsTo ).toEqual( lists );

        } );

    } )

} );