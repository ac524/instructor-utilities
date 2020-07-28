import List from "./List";
import store from "../../store";

class ListItem {

    /**
     * @param {string} label 
     * @param {boolean} isDisabled
     * @param {List} list
     */
    constructor( { id, name = '', ListId } = {} ) {
        
        this.id = id;
        this.name = name;
        this.ListId = ListId;

    }

    get belongsTo() {
        return store.getList(this.ListId);
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
        return this.belongsTo ? this.belongsTo.isItemSelected( this.id ) : false;
    }

    /**
     * Flag for if this item's index is the last item selected.
     * @returns {boolean}
     */
    get isCurrent() {
        return this.belongsTo ? this.id === this.belongsTo.currentItemId : false;
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
    update( { name } ) {

        let updated = false;
        const maybeUpdateValue = ( property, newValue ) => {
            if( this.hasOwnProperty( property ) && this[property] !== newValue ) {

                this[property] = newValue;

                if( !updated ) updated = {};
                updated[property] = newValue;
    
            }
        }

        maybeUpdateValue( 'name', name );

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