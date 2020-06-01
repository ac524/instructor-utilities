import ListItem from "../../../resources/js/lists/models/ListItem";
import List from "../../../resources/js/lists/models/List"

describe( "ListItem", () => {

    // describe("Intialization", () => {

    //     it("should pass", () => {

    //         expect(true).toEqual(true);

    //     });

    // });

    describe( 'index', () => {

        it( "should return null if accessed before being added to a list", () => {

            const item = new ListItem();

            expect( item.index ).toEqual( null );
    
        } );

        it( "should return the index position within a list after the item is added to one", () => {

            const item = new ListItem();
            const list = new List();

            list.addItem( item );

            expect( item.index ).toEqual( 0 );
    
        } );

    } );

    describe( 'isSelected', () => {

        it( "should return false if not added to a list", () => {
            
            const item = new ListItem();

            expect( item.isSelected ).toEqual( false );

        } );

        it( "should return false if not a selected item in the list", () => {
            
            const item = new ListItem();
            const list = new List();

            list.addItem( item );

            expect( item.isSelected ).toEqual( false );

        } );

        it( "should return true if the list has selected the item", () => {
            
            const item = new ListItem();
            const list = new List();

            list.addItem( item ).select( item.index );

            expect( item.isSelected ).toEqual( true );

        } );

        it( "should return false if item has been unselected", () => {

            const item = new ListItem();
            const list = new List();

            list.addItem( item ).select( item.index );

            item.unselect();

            expect( item.isSelected ).toEqual( false );

        });

    } );

    describe( 'isCurrent', () => {

        it( "should return false if not added to a list", () => {

            const item = new ListItem();

            expect( item.isCurrent ).toEqual( false );

        } );

        it( "should return false if it is not a selected item", () => {

            const item = new ListItem();
            const list = new List();

            list.addItem( item );

            expect( item.isCurrent ).toEqual( false );

        } );

        it( "should return false if it is selected but not the currently selected item", () => {

            const item = new ListItem();
            const item2 = new ListItem();
            const list = new List();

            list
                // Add both items
                .addItem( item )
                .addItem( item2 )
                // Select the first
                .select( item.index )
                // Then select the second
                .select( item2.index );

            expect( item.isCurrent ).toEqual( false );

        } );

    });

} );