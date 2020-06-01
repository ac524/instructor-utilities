import List from "./List"

class ListItem {

    /**
     * @param {string} label 
     * @param {boolean} isDisabled
     * @param {List} list
     */
    constructor( { label, isDisabled = false }, list ) {

        this.label = label;
        this.isDisabled = isDisabled;

        Object.defineProperty( this, 'belongsTo', {
            get: () => list
        } );

    }

    /**
     * The item's position in the list it belongs to.
     * @returns {number}
     */
    get index() {
        return this.belongsTo.all.indexOf( this );
    }

    /**
     * Flag for if this item's index exists in the list it belongs to.
     * @returns {boolean}
     */
    get isSelected() {
        return this.belongsTo.isSelected( this.index );
    }

    /**
     * Flag for if this item's index is the last item selected.
     * @returns {boolean}
     */
    get isCurrent() {
        return this.index === this.belongsTo.currentIndex;
    }

    /**
     * @param {string} label
     * @returns {ListItem}
     */
    update( { label } ) {

        if( label !== this.label ) {
            this.label = label;
            this.belongsTo.save();
        }

        return this;

    }

    /**
     * Modifies the item's disabled state and updates it's state in the list it belongs to.
     * @returns {ListItem}
     */
    toggleDisable() {

        this.isDisabled = !this.isDisabled;

        if( this.isDisabled && this.isSelected )

            this.belongsTo.unselect( this.index );

        this.belongsTo.save();

        return this;

    }

}

export default ListItem;