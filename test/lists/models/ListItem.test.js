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

    describe( "save", () => {

        it( "should return the object it was called from", () => {

            const item = new ListItem();

            expect( item.save() ).toEqual( item );

        } );

        it( "should not call save on a parent list if one has not been set", () => {

            const item = new ListItem();
            const list = new List();
            const mock = jest.spyOn( list, "save" );

            item.save();

            expect( mock ).not.toHaveBeenCalled();

        } );

        it( "should call save on a parent list if the item has been assigned to one", () => {

            const item = new ListItem();
            const list = new List();

            const mock = jest.spyOn( list, "save" );

            list.addItem( item );

            item.save();

            expect( mock ).toHaveBeenCalled();

        } );

    });

    describe( "save", () => {

        it( "should return the object it was called from", () => {

            const item = new ListItem();

            expect( item.unselect() ).toEqual( item );

        } );

        it( "should not call unselect on a parent list if one has not been set", () => {

            const item = new ListItem();
            const list = new List();
            const mock = jest.spyOn( list, "unselect" );

            item.unselect();

            expect( mock ).not.toHaveBeenCalled();

        } );

        it( "should call unselect on a parent list if the item has been assigned to one", () => {

            const item = new ListItem();
            const list = new List();

            const mock = jest.spyOn( list, "unselect" );

            list.addItem( item );

            item.unselect();

            expect( mock ).toHaveBeenCalled();

        } );

    } );

    describe( "update", () => {

        it( "should return the object it was called from", () => {

            const item = new ListItem();

            expect( item.update({}) ).toEqual( item );

        } );

        it( "should update the label when passed an object with that property", () => {

            const item = new ListItem( { label: 'First label' } );
            const newItemData = { label: "New label" };

            item.update( newItemData );

            expect( item.label ).toEqual( newItemData.label );

        } );

        it( "should not call save if the label didn't change", () => {

            const item = new ListItem( { label: 'Same label' } );
            const newItemData = { label: "Same label" };

            const mock = jest.spyOn( item, "save" );

            item.update( newItemData );

            expect( mock ).not.toHaveBeenCalled();

        } );

        it( "should call save if the label changed", () => {

            const item = new ListItem( { label: 'First label' } );
            const newItemData = { label: "New label" };

            const mock = jest.spyOn( item, "save" );

            item.update( newItemData );

            expect( mock ).toHaveBeenCalled();

        } );

    } );

    describe( "toggleDisable", () => {

        it( "should return the object it was called from", () => {

            const item = new ListItem();

            expect( item.update({}) ).toEqual( item );

        } );

        it( "should toggle the isDisabled property between true and false with each call", () => {

            const item = new ListItem( { isDisabled: false } );

            item.toggleDisable();

            expect( item.isDisabled ).toEqual( true );

            item.toggleDisable();

            expect( item.isDisabled ).toEqual( false );

        } );

        it( "should unselect the item if it is selected and becomes disabled", () => {

            const item = new ListItem( { isDisabled: false } );
            const list = new List;

            list.addItem( item ).select( item.index );

            item.toggleDisable();

            expect( item.isSelected ).toEqual( false );

        });

        it( "should call the save method", () => {

            const item = new ListItem;
            const mock = jest.spyOn( item, "save" );

            item.toggleDisable();

            expect( mock ).toHaveBeenCalled();

        });

    } );

} );