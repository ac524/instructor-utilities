import List from "./List"

class ListItem {

    /**
     * @param {string} label 
     * @param {boolean} isDisabled
     * @param {List} list
     */
    constructor( { label = '', isDisabled = false } = {} ) {

        this.label = label;
        this.isDisabled = isDisabled;

        let belongsTo;

        Object.defineProperty( this, 'belongsTo', {
            get: () => belongsTo,
            set: (list) => belongsTo = list
        } );

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
        return this.belongsTo ? this.belongsTo.isSelected( this.index ) : false;
    }

    /**
     * Flag for if this item's index is the last item selected.
     * @returns {boolean}
     */
    get isCurrent() {
        return this.belongsTo ? this.index === this.belongsTo.currentIndex : false;
    }

    save() {

        if( this.belongsTo ) this.belongsTo.save();

        return this;

    }

    unselect() {

        if( this.belongsTo ) this.belongsTo.unselect( this.index );

        return this;

    }

    /**
     * @param {string} label
     * @returns {ListItem}
     */
    update( { label } ) {

        if( label !== this.label ) {
            this.label = label;
            this.save();
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

            this.unselect( this.index );

        this.save();

        return this;

    }

}

export default ListItem;