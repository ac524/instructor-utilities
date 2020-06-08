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

    describe( "update", () => {

        it( "should update the 'name' property when passing in a new value", () => {

            const list = new List;
            const name = 'New Label';

            list.update( { name } );

            expect( list.name ).toEqual( name );

        } );

        it( "should not call the parent collection save method if the name does not change", () => {

            const name = 'Label';
            const list = new List( '', name );
            const lists = new Lists;

            const saveMock = jest.spyOn( lists, "save" );
            saveMock.mockImplementation( () => lists  );

            lists.addList( list );

            list.update( { name } );

            expect( saveMock ).not.toHaveBeenCalled();

        } );

        it( "should call the parent collection save method if the name does change", () => {

            const name = 'Label';
            const list = new List( '', name );
            const lists = new Lists;
            
            const saveMock = jest.spyOn( lists, "save" );
            saveMock.mockImplementation( () => lists  );

            lists.addList( list );

            list.update( { name: 'New Label' } );

            expect( saveMock ).toHaveBeenCalled();

        } );

    });

    describe( "load", () => {

        it("should not load the list data from the store if it does not have access to one", () => {

            const list = new List;
            const store = new Store;

            const loadMock = jest.spyOn( store, "loadListItemData" );
            loadMock.mockImplementation( () => ({
                list: [ new ListItem, new ListItem ],
                selectList: []
            })  );

            list.load();

            expect( loadMock ).not.toHaveBeenCalled();

        });

        it("should load list items and selected indexes when it has acces to a store", () => {

            const list = new List;
            const lists = new Lists;
            const store = new Store;

            const listItems = [ new ListItem({label: 'Item One'}), new ListItem({label: 'Item Two'}) ];
            const selectedIndexes = [ 1 ];

            store.setLists( lists );
            lists.addList( list );

            const loadMock = jest.spyOn( store, "loadListItemData" );
            loadMock.mockImplementation( () => ({
                list: listItems,
                selectList: selectedIndexes
            })  );

            list.load();

            expect( loadMock ).toHaveBeenCalled();
            expect( list.all ).toEqual( listItems );
            expect( list.selected ).toEqual( selectedIndexes );

        });

    });

    describe( "isSelected", () => {

        it( "should should return true if given an index that is selected", () => {

            const list = new List;
            const itemToSelect = new ListItem;

            list
                .addItem( new ListItem ).addItem( itemToSelect )
                .select( itemToSelect.index );

            expect( list.isSelected( itemToSelect.index ) ).toEqual( true );

        } );

        it( "should should return false if given an index that is not selected", () => {

            const list = new List;
            const itemToSelect = new ListItem;
            const itemNotToSelect = new ListItem;

            list
                .addItem( itemNotToSelect ).addItem( itemToSelect )
                .select( itemToSelect.index );

            expect( list.isSelected( itemNotToSelect.index ) ).toEqual( false );

        } );

        it( "should should return false if given an index that does not exist", () => {

            const list = new List;

            list.addItem( new ListItem ).addItem( new ListItem );

            expect( list.isSelected( 3 ) ).toEqual( false );

        } );

    });

    describe( "emptySelected", () => {

        it( "should remove all selected items", () => {

            const list = new List;
            const item1 = new ListItem;
            const item2 = new ListItem;
            const item3 = new ListItem;

            list
                .addItem(item1).addItem(item2).addItem(item3)
                .select(item1.index).select(item2.index).select(item3.index);
            
            list.emptySelected();

            expect( list.selected.length ).toEqual(0);

        } );

        it( "should call the save method", () => {

            const list = new List;
            const saveMock = jest.spyOn( list, "saveSelected" );

            saveMock.mockImplementation( () => list );

            list.emptySelected();

            expect( saveMock ).toHaveBeenCalled();

        });

    });

    describe( "selectRandom", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.selectRandom() ).toEqual( list );

        });

        it( "should select one random item index", () => {

            const list = new List;
            const item1 = new ListItem;
            const item2 = new ListItem;
            const item3 = new ListItem;

            list.addItems( [ item1, item2, item3 ] );

            list.selectRandom();

            expect( list.selected.length ).toEqual( 1 );
            expect( [ item1.index, item2.index, item3.index ] ).toEqual( expect.arrayContaining( list.selected ) );

        } );

        it( "should not select a new item if all items are selected", () => {

            const list = new List;
            const item1 = new ListItem;
            const item2 = new ListItem;

            list
                .addItems( [ item1, item2 ] )
                .select( item1.index ).select( item2.index );

            list.selectRandom();

            expect( list.selected ).toEqual( [ item1.index, item2.index ] );

        });

    });

    describe( "empty", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.empty() ).toEqual( list );

        });

        it( "should remove all items", () => {

            const list = new List;
            const item1 = new ListItem;
            const item2 = new ListItem;

            list.addItems( [ item1, item2 ] );

            list.empty();

            expect( list.all.length ).toEqual( 0 );

        } );

        it( "should remove all selected indexes", () => {

            const list = new List;
            const item1 = new ListItem;
            const item2 = new ListItem;

            list
                .addItems( [ item1, item2 ] )
                .select( item1.index );

            list.empty();

            expect( list.selected.length ).toEqual( 0 );

        } );

    });

    describe( "addItem", () => {

        it( "should return the object it was called from", () => {

            const list = new List;
            const listItem = new ListItem;

            expect( list.addItem( listItem ) ).toEqual( list );

        });

        it( "should add the given item to the list", () => {

            const list = new List;
            const listItem = new ListItem({label: "A"});

            list.addItem( listItem );

            expect( list.all[0] ).toEqual( listItem );

        } );

        it( "should set the list to the item's belongsTo property", () => {

            const list = new List;
            const listItem = new ListItem({label: "A"});

            list.addItem( listItem );

            expect( listItem.belongsTo ).toEqual( list );

        } );

        it( "should call save", () => {

            const list = new List;
            const listItem = new ListItem({label: "A"});
            const mock = jest.spyOn( list, "save" );

            list.addItem( listItem );

            expect( mock ).toHaveBeenCalled();

        } );

    });

    describe( "addItems", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.addItems([]) ).toEqual( list );

        });

        it( "should add all given items", () => {

            const list = new List;
            const item1 = new ListItem({label: 'A'});
            const item2 = new ListItem({label: 'B'});

            list.addItems( [ item1, item2 ] );

            expect( list.all ).toEqual( expect.arrayContaining( [ item1, item2 ] ) );

        });

    });

    describe( "replaceItems", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.replaceItems([]) ).toEqual( list );

        });

        it( "should remove all existing items", () => {

            const list = new List;
            const item1 = new ListItem({label: 'A'});
            const item2 = new ListItem({label: 'B'});
            const item3 = new ListItem({label: 'C'});

            list.addItems( [ item1, item2 ] );

            list.replaceItems([ item3 ]);

            expect( list.all ).not.toContain( item1 );
            expect( list.all ).not.toContain( item2 );

        } );

        it( "should add all given items", () => {

            const list = new List;
            const item1 = new ListItem({label: 'A'});
            const item2 = new ListItem({label: 'B'});

            list.replaceItems([ item1, item2 ]);

            expect( list.all ).toEqual( expect.arrayContaining( [ item1, item2 ] ) );

        } );

    });

    describe( "createItem", () => {

        it( "should return a new ListItem with the given label", () => {

            const list = new List;
            const itemLabel = "New Item";

            const item = list.createItem( itemLabel );

            expect( item instanceof ListItem ).toEqual( true );
            expect( item.label ).toEqual( itemLabel );

        });

        it( "should add one new list item with the given label", () => {

            const list = new List;
            const itemLabel = "New Item";

            list.createItem( itemLabel );

            expect( list.all.length ).toEqual( 1 );
            expect( list.all[0].label ).toEqual( itemLabel );

        } );

    } );

    describe( "updateItem", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.updateItem() ).toEqual( list );

        });


        it( "should update the target item with given details", () => {

            const list = new List;
            const newLabel = "New Label";

            list.createItem( "Original Label" );

            list.updateItem( 0, { label: newLabel } );

            expect( list.all[0].label ).toEqual( newLabel );

        });

    } );

    describe( "select", () => {

        it( "should return the object it was called from", () => {

            const list = new List;
            const item = list.createItem( 'A' );

            expect( list.select(item.index) ).toEqual( list );

        });

        it( "should add existing target indexes to the select list", () => {

            const list = new List;
            const item = list.createItem( 'A' );

            list.select(item.index);

            expect( list.selected ).toContain( item.index );

        });

        it( "should not add a target index to the select list if it does not exist", () => {

            const list = new List;
            const targetIndex = 0;

            list.select(targetIndex);

            expect( list.selected ).not.toContain( targetIndex );

        });

        it( "should not add duplicate indexes to the select list", () => {

            const list = new List;
            const item = list.createItem( 'A' );
            const targetIndex = item.index;

            list.select(targetIndex).select(targetIndex);

            expect( list.selected.length ).toEqual( 1 );

        });

        it( "should call saveSelected after a new index has been added", () => {

            const list = new List;
            const item = list.createItem( 'A' );
            const mock = jest.spyOn( list, "saveSelected" );

            list.select( item.index );

            expect( mock ).toHaveBeenCalled();

        });

        it( "should not call saveSelected if the target index is not added to the select list", () => {

            const list = new List;
            const mock = jest.spyOn( list, "saveSelected" );

            list.select( 0 );

            expect( mock ).not.toHaveBeenCalled();

        });

    } );

    describe( "unselect", () => {

        it( "should return the object it was called from", () => {

            const list = new List;
            const item = list.createItem( 'A' );

            list.select( item.index );

            expect( list.unselect(item.index) ).toEqual( list );

        });

        it( "should remove a target index from the select list", () => {

            const list = new List;
            const item = list.createItem( 'A' );

            list
                .select( item.index )
                .unselect(item.index);

            expect( list.selected ).not.toContain( item.index );

        });

        it( "should not remove an item from the select list if the target index is not selected", () => {

            const list = new List;
            const item1 = list.createItem( 'A' );
            const item2 = list.createItem( 'B' );

            list
                .select( item1.index )
                .unselect( item2.index );

            expect( list.selected.length ).toEqual( 1 );
            expect( list.selected ).toContain( item1.index );

        });

        it( "should call saveSelected if an index is removed from the select list", () => {

            const list = new List;
            const item = list.createItem( 'A' );

            list.select( item.index );

            const mock = jest.spyOn( list, "saveSelected" );

            list.unselect( item.index );

            expect( mock ).toHaveBeenCalled();

        });

        it( "should not call saveSelected if an index is not removed from the select list", () => {

            const list = new List;
            const item1 = list.createItem( 'A' );
            const item2 = list.createItem( 'B' );

            list.select( item1.index );

            const mock = jest.spyOn( list, "saveSelected" );

            list.unselect( item2.index );

            expect( mock ).not.toHaveBeenCalled();

        });

    });

    describe( "indexOf", () => {

        it( "should return the index of a given item that exists", () => {
            
            const list = new List;
            const item = list.createItem( "A" );

            expect( list.indexOf( item ) ).toEqual( 0 );

        } );

        it( "should return -1 if the item does not exist", () => {
            
            const list = new List;
            const item = new ListItem( "A" );

            expect( list.indexOf( item ) ).toEqual( -1 );

        } );

    });

    describe( "remove", () => {

        it( "should return the object it was called from", () => {

            const list = new List;
            const item = list.createItem( "A" );

            expect( list.remove( item.index ) ).toEqual( list );

        });

        it( "should remove the item from the list if the index exists", () => {

            const list = new List;
            const item = list.createItem( "A" );

            list.remove( item.index );

            expect( list.all ).not.toContain( item );

        });

        it( "should not modify the list if the index does not exist", () => {

            const list = new List;
            const item = list.createItem( "A" );

            list.remove( 1 );

            expect( list.all.length ).toEqual( 1 );
            expect( list.all ).toContain( item );

        });

        it( "should set the item's belongsTo property to null", () => {

            const list = new List;
            const item = list.createItem( "A" );

            list.remove( item.index );

            expect( item.belongsTo ).toEqual( null );

        });

        it( "should call save when an item is removed", () => {

            const list = new List;
            const item = list.createItem( "A" );
            const mock = jest.spyOn( list, "save" );

            list.remove( item.index );

            expect( mock ).toHaveBeenCalled();

        });

        it( "should not call save when an item is not", () => {

            const list = new List;
            const mock = jest.spyOn( list, "save" );

            list.remove( 0 );

            expect( mock ).not.toHaveBeenCalled();

        });

        it( "should call emptySelected when an item is removed", () => {

            const list = new List;
            const item = list.createItem( "A" );
            const mock = jest.spyOn( list, "emptySelected" );

            list.remove( item.index );

            expect( mock ).toHaveBeenCalled();

        });

        it( "should not call emptySelected when an item is not", () => {

            const list = new List;
            const mock = jest.spyOn( list, "emptySelected" );

            list.remove( 0 );

            expect( mock ).not.toHaveBeenCalled();

        });

    });

    describe( "save", () => {

        it( "should return the object it was called from", () => {

            const list = new List;

            expect( list.save() ).toEqual( list );

        });

        it( "should call the store's saveListItems method with the list's key and items if it has access to one", () => {

            const listKey = "test";
            const list = new List( listKey );
            const lists = new Lists;
            const store = new Store;
            const mock = jest.spyOn( store, "saveListItems" );
            mock.mockImplementation( () => store );

            lists.addList(list);
            store.setLists(lists);

            list.createItem( "A" );
            list.createItem( "B" );

            expect( mock ).toHaveBeenCalledWith( listKey, list.all );

        });

    });
    
} );