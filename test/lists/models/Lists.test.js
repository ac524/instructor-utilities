import Lists from "../../../resources/js/lists/models/Lists";
import Store from "../../../resources/js/lists/store";

describe( "Lists", () => {

    describe( "store", () => {

        it( "should be undefined by default", () => {

            const lists = new Lists;

            expect( typeof lists.store ).toEqual( "undefined" );

        } );

        it( "should be the store if it is assigned to one", () => {

            const lists = new Lists;
            const store = new Store;

            store.setLists( lists );
            
            expect( lists.store ).toEqual( store );

        } );

    } );

} );