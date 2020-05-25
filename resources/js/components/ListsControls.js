import ListItemPicker from "../ListItemPicker";

class ListsControls {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        // Available Lists
        this.listOptionsEl = $('#list-options');

        // List Collection Controls
        // this.newListButtonEl = $('#new-list');
        this.deleteListButtonEl = $('#delete-list');

        this.listOptionsEl.on( 'change', ( { currentTarget: { value } } ) => this.app.selectList( value ) );

        this.deleteListButtonEl.on( 'click', () => this.app.deleteList( this.app.lists.currentList.key ) );

    }

}

export default ListsControls;