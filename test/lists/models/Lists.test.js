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
    })

} );