import ListItemPicker from "../controllers/ListItemPicker";
import store from "../../store";

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

        // Current List Display
        this.currentTitleEl = $('#current-list-title');

        this.listOptionsEl.on( 'change', ( { currentTarget: { value } } ) => this.app.selectList( value ) );

        this.deleteListButtonEl.on( 'click', () => this.app.deleteList( store.lists.currentList.id ) );

    }

    /**
     * @returns {ListsControls}
     */
    renderListName() {

        this.currentTitleEl.text( store.lists.currentList.name );

        return this;

    }

    /**
     * @param {string} currentKey
     * @returns {ListsControls}
     */
    renderListOptions() {

        this.listOptionsEl.empty();

        store.lists.all.forEach( ([key, list]) => {
            this.listOptionsEl.append(
                $(`<option value="${key}">${list.name}</option>`).prop('selected', list.isCurrent )
            );
        });

        return this;

    }

    /**
     * @returns {ListsControls}
     */
    render() {

        this.deleteListButtonEl.prop( "disabled", !store.lists.hasMultipleLists );

        return this
            .renderListName()
            .renderListOptions();

    }

}

export default ListsControls;