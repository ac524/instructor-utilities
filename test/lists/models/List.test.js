import Lists from "../../../resources/js/lists/models/Lists";
import List from "../../../resources/js/lists/models/List";
import ListItem from "../../../resources/js/lists/models/ListItem";
import Store from "../../../resources/js/lists/store";

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

    });

    describe("disabled", () => {

        it("should return an array of disabled items", () => {

            const list = new List();

            const item = new ListItem({isDisabled: true});
            const item2 = new ListItem();

            const expected = [item];

            list.addItem(item).addItem(item2);

            expect(list.disabled).toEqual(expect.arrayContaining(expected));

        });

        it("should return an empty array if no items are in the list", () => {

            const list = new List();
            
            expect(list.disabled).toEqual([]);

        });

    });

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

    } );

    describe( "current", () => {

        it( "should return null if there are no selected items", () => {

            const list = new List;
            const item = new ListItem;

            list.addItem( item );

            expect( list.current ).toEqual( null );

        } );

        it( "should return the currently selected item when one has been selected", () => {

            const list = new List;
            const item1 = new ListItem( { label: 'One' } );
            const item2 = new ListItem( { label: 'Two' } );
            const item3 = new ListItem( { label: 'Three' } );

            list
                .addItem( item1 ).addItem( item2 ).addItem( item3 )
                .select( 2 ).select( 0 );

            expect( list.current ).toEqual( item1 );

        } );

    } );

    describe( "store", () => {

        it( "should return null if not assigned to a list collection", () => {

            const list = new List;

            expect( list.store ).toEqual( null );

        } );

        it( "should return null if assigned to a list collection not set to a store", () => {

            const list = new List;
            const lists = new Lists;

            lists.addList( list );

            expect( list.store ).toEqual( null );

        } );

        it( "should return the store the list collection is set to when added to the collection", () => {

            const list = new List;
            const lists = new Lists;
            const store = new Store;

            store.setLists( lists );
            lists.addList( list );

            expect( list.store ).toEqual( store );

        } );

    });
    
} );