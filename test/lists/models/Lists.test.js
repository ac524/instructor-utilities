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

    describe( "getByIndex", () =>{

        it("should return a list object for the matching index", () =>{
            const lists = new Lists;
            const list = new List("test");
            lists.addList(list)
            
            const selectedList = lists.getByIndex(0);

            expect( selectedList ).toEqual( list );
        });


        it("should return null if given an index that does not exist", () =>{
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

} );