import List from "./List";
import store from "../../store";

class ListItem {

    /**
     * @param {string} label 
     * @param {boolean} isDisabled
     * @param {List} list
     */
    constructor( { name = '', ListId } = {} ) {

        this.name = name;
        this.ListId = ListId;

    }

    get belongsTo() {
        store.getList(this.ListId);
    }

    /**
     * The item's position in the list it belongs to.
     * @returns {number}
     */
    get index() {
        return this.belongsTo ? this.belongsTo.all.indexOf( this ) : null;
    }

    /**
     * Flag for if this item's index exists in the list it belongs to.
     * @returns {boolean}
     */
    get isSelected() {
        return this.belongsTo ? this.belongsTo.isItemSelected( this.index ) : false;
    }

    /**
     * Flag for if this item's index is the last item selected.
     * @returns {boolean}
     */
    get isCurrent() {
        return this.belongsTo ? this.index === this.belongsTo.currentItemIndex : false;
    }

    save() {

        if( this.belongsTo ) this.belongsTo.saveItems();

        return this;

    }

    unselect() {

        if( this.belongsTo ) this.belongsTo.unselectItem( this.index );

        return this;

    }

    /**
     * @param {string} label
     * @returns {boolean}
     */
    update( { label } ) {

        let updated = false;

        if( label !== this.name ) {
            this.name = label;
            updated = true;
        }

        return updated;

    }

    /**
     * Modifies the item's disabled state and updates it's state in the list it belongs to.
     * @returns {ListItem}
     */
    toggleDisable() {

        this.isDisabled = !this.isDisabled;

        if( this.isDisabled && this.isSelected )

            this.unselect();

        return this;

    }

}

export default ListItem;