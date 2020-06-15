import Lists from "../../../resources/js/lists/models/Lists";
import Store from "../../../resources/js/lists/store";
import List from "../../../resources/js/lists/models/List";

describe( "Lists", () => {

    describe( "store", () => {

        it( "should be null by default", () => {

            const lists = new Lists;

            expect( lists.store ).toEqual( null );

        } );

        it( "should be the store if it is assigned to one", () => {

            const lists = new Lists;
            const store = new Store;

            store.setLists( lists );
            
            expect( lists.store ).toEqual( store );

        } );

    } );

    describe( "addList", () => {

        it( "should return the object it was called from", () => {

            const lists = new Lists;
            const listA = new List( 'testA', 'List A' );

            expect( lists.addList( listA ) ).toEqual( lists );

        });

        it( "should add the given list to the collection", () => {

            const lists = new Lists;
            const listA = new List( 'testA', 'List A' );

            lists.addList( listA );

            expect( lists.get( listA.key ) ).toEqual( listA );

        });

        it( "should assign the collect to the given list's belongsTo property", () => {

            const lists = new Lists;
            const listA = new List( 'testA', 'List A' );

            lists.addList( listA );

            expect( listA.belongsTo ).toEqual( lists );

        });

    });

    describe( "createList", () => {

        it( "should return a new List object with the given name", () => {

            const lists = new Lists;
            const name = "List A";

            const list = lists.createList( name );

            expect( list instanceof List ).toEqual( true );
            expect( list.name ).toEqual( name );

        });

        it( "should generate a list key", () => {

            const lists = new Lists;

            const list = lists.createList( "List A" );

            expect( list.key ).not.toEqual( '' );

        });

        it( "should add the created list to the collection by default", () => {

            const lists = new Lists;

            const list = lists.createList( "List A" );

            expect( lists.get( list.key ) ).toEqual( list );

        });

        it( "should not add the created list to the collection if given false", () => {

            const lists = new Lists;

            const list = lists.createList( "List A", false );

            expect( lists.get( list.key ) ).toEqual( null );

        });

    });

    describe( "getByIndex", () =>{

        it( "should return a list object for the matching index", () =>{
            const lists = new Lists;
            const list = new List("test");
            lists.addList(list)
            
            const selectedList = lists.getByIndex(0);

            expect( selectedList ).toEqual( list );
        });


        it( "should return null if given an index that does not exist", () =>{
            const lists = new Lists;
            const selectedList = lists.getByIndex(0);

            expect( selectedList ).toEqual( null );
            
        })
    });


    describe( "count", () => {

        it( "should return the current count of lists", () => {

            const lists = new Lists;

            lists.createList( "List 1" );
            lists.createList( "List 2" );

            expect( lists.count ).toEqual( 2 );

        } );

    });

    describe( "currentList", () => {

        it( "should return null if no lists exist", () => {

            const lists = new Lists;

            expect( lists.currentList ).toEqual( null );

        });

        it( "should return the first list if one has not been selected", () => {

            const lists = new Lists;

            const listA = lists.createList( "List 1" );
            lists.createList( "List 2" );

            expect( lists.currentList ).toEqual( listA );

        });

        it( "should return the selected list if one has been selected", () => {

            const lists = new Lists;

            lists.createList( "List 1" );
            const listB = lists.createList( "List 2" );

            lists.selectList( listB.key );

            expect( lists.currentList ).toEqual( listB );

        });

    });

    describe( "all", () => {

        it( "should return an empty array by default", () => {

            const lists = new Lists;

            expect( lists.all.length ).toEqual( 0 );

        });

        it( "should return an array list of contained list keys and list objects", () => {

            const lists = new Lists;

            const listA = lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            const expectedList = [
                [ listA.key, listA ],
                [ listB.key, listB ]
            ];

            expect( lists.all ).toEqual( expectedList );

        });

    });

    describe( "get", () => {

        it( "should return null if the given key does not exist", () => {

            const lists = new Lists;

            expect( lists.get( 'test' ) ).toEqual( null );

        });

        it( "should return the target list if one exists with the given key", () => {

            const lists = new Lists;

            lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            expect( lists.get( listB.key ) ).toEqual( listB );

        });

    });

    describe( "selectIndex", () => {

        it( "should return the object it was called from", () => {
            
            const lists = new Lists;

            expect( lists.selectIndex(0) ).toEqual( lists );

        });

        it( "should set the list for the given index as the current list", () => {
            
            const lists = new Lists;

            lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            lists.selectIndex(1);

            expect( lists.currentList ).toEqual( listB );

        });

        it( "should not modify the set current list if the given index does not exist", () => {

            const lists = new Lists;

            lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            lists
                .selectIndex(1)
                .selectIndex(2);

            expect( lists.currentList ).toEqual( listB );

        });

    });

    describe( "selectList", () => {

        it( "should return the object it was called from", () => {
            
            const lists = new Lists;

            expect( lists.selectList('test') ).toEqual( lists );

        });

        it( "should set the list for the given key as the current list", () => {
            
            const lists = new Lists;

            lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            lists.selectList( listB.key );

            expect( lists.currentList ).toEqual( listB );

        });

        it( "should not modify the set current list if the given key does not exist", () => {

            const lists = new Lists;

            lists.createList( "List A" );
            const listB = lists.createList( "List B" );

            lists
                .selectList( listB.key )
                .selectList( "test" );

            expect( lists.currentList ).toEqual( listB );

        });

    });

} );