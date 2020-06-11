import Lists from "../../../resources/js/lists/models/Lists";
import List from "../../../resources/js/lists/models/List";
import ListItem from "../../../resources/js/lists/models/ListItem";

describe( "List", () => {

    // describe("Intialization", () => {

    //     it("should pass", () => {

    //         expect(true).toEqual(true);

    //     });

    // });

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

    describe( "isCurrent", () => {
        it( "should return true if it is the current list in a collection of lists", () =>{
            const list = new List("test");
            const lists = new Lists;

            lists.addList( list ).selectList(list.key);

            expect( list.isCurrent ).toEqual(true);

        } );

        it( "should return false if it has not been added to a collection", () =>{
            const list = new List;
            
            expect( list.isCurrent ).toEqual(false);
        });

        it( "should should return false if it is NOT the current list in a collection", () =>{
            const list = new List("test");
            const lists = new Lists;

            lists.addList( list );

            expect( list.isCurrent ).toEqual(false);

        })

    });

} );