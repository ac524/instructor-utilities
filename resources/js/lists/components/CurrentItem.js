import ListItemPicker from "../controllers/ListItemPicker";
import List from "../models/list";

class CurrentItem {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        // Current List Selection Display
        this.currentItemEl = $('#current-name');

    }

    /**
     * @returns {List}
     */
    get currentList() {
        return this.app.lists.currentList;
    }

    /**
     * @returns {CurrentItem}
     */
    render() {

        if( this.currentList.isComplete ) {

            this.currentItemEl.text( this.currentList.current.label );

        } else {

            this.currentList.selected.length
                
                ? this.currentItemEl.text( this.currentList.current.label )

                : this.currentItemEl.text( 'No Selection' );

        }

        return this;

    }

}

export default CurrentItem;