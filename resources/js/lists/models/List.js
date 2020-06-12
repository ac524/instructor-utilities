import ListItem from "./ListItem";
import Store from "../store";

/**
 * Collection class for managing the entries and selection state for a target list.
 */
class List {

    /**
     * List class constructor
     * @param {string} key 
     * @param {string} name 
     * @param {array} items 
     * @param {array} selectedItems
     */
    constructor( key = '', name = '', { items = [], selectedItems = [] } = {} ) {

        this.key = key;
        this.name = name;

        // Private properties to control access.
        const currentItems = [];
        const currentSelectedItems = [];

        let belongsTo = null;

        // Control the access of the array to ensure we are always working with the same array instance.
        Object.defineProperty( this, 'all', {
            get: () => currentItems,
            set: this.replaceItems.bind(this)
        } );
        
        // Control the access of the array to ensure we are always working with the same array instance.
        Object.defineProperty( this, 'selected', {
            get: () => currentSelectedItems,
            set: function( itemIndexes ) {
                currentSelectedItems.length = 0;
                currentSelectedItems.push( ...itemIndexes );
            }
        } );

        // Object.defineProperty( this, 'storageKey', { get: () => storageKey } );
        // Object.defineProperty( this, 'selectStorageKey', { get: () => selectStorageKey } );

        Object.defineProperty( this, 'belongsTo', {
            get: () => belongsTo,
            set: ( lists ) => belongsTo = lists
        } );

        this.all = items;
        this.selected = selectedItems;

    }

    /**
     * List of enabled items.
     */
    get enabledItems() {

        return this.all.filter( item => !item.isDisabled );

    }

    /**
     * List of disabled items.
     */
    get disabledItems() {

        return this.all.filter( item => item.isDisabled );

    }

    /**
     * @returns {boolean}
     */
    get isComplete() {

        return this.enabledItems.length ? this.enabledItems.length === this.selected.length : false;

    }

    /**
     * @returns {boolean}
     */
    get isCurrent() {

        return this.belongsTo
        
            ? this.key === this.belongsTo.currentListKey
            
            : false;
            
    }

    get currentItemIndex() {

        return this.selected[ this.selected.length - 1 ] >= 0 ? this.selected[ this.selected.length - 1 ] : null;

    }

    /**
     * @returns {ListItem}
     */
    get currentItem() {

        return this.all[this.currentItemIndex] || null;

    }

    /**
     * @returns {Store}
     */
    get store() {

        return this.belongsTo ? this.belongsTo.store : null;

    }

    load() {

        if( this.store ) {

            const { list, selectList } = this.store.loadListItemData( this.key );

            if( list ) this.all = list;

            if( selectList ) this.selected = selectList;

        }

        return this;

    }

    /**
     * @param {Object} props
     * @param {string} props.name
     * @returns {boolean}
     */
    update( { name } ) {

        let updated = false;

        if( this.name !== name ) {

            this.name = name;
            if(!updated) updated = true;

        }

        return updated;

    }

    /**
     * @returns {List}
     */
    emptyItems() {

        this.all.length = 0;

        return this.emptySelected();

    }

    /**
     * @returns {List}
     */
    emptySelected() {

        this.selected.length = 0;

        return this;

    }

    /**
     * @returns {List}
     */
    selectRandomItem() {

        let unusedIndexes = this.enabledItems.map( ( { index } ) => index ).filter( ( i ) => !this.selected.includes( i ) );

        if( unusedIndexes.length ) {

            let nextItemIndex = unusedIndexes[ Math.floor(Math.random() * unusedIndexes.length) ];
    
            this.selectItem( nextItemIndex );

        }

        return this;

    }


    /**
     * @param {string} item
     * @returns {ListItem}
     */
    createItem( label ) {

        const newItem = new ListItem( { label } );

        this.addItem( newItem );

        return newItem;

    }

    /**
     * @param {ListItem} listItem
     * @returns {List}
     */
    addItem( listItem ) {

        listItem.belongsTo = this;

        this.all.push( listItem );

        return this;
        
    }

    /**
     * @param {Array.<ListItem>} myObjects
     * @returns {List}
     */
    addItems( items ) {

        items.forEach( this.addItem.bind(this) );

        return this;

    }

    /**
     * @param {Array.<ListItem>} myObjects
     * @returns {List}
     */
    replaceItems( items ) {

        return this.emptyItems().addItems( items );

    }

    /**
     * @returns {boolean}
     */
    updateItem( index, update ) {

        if( this.all[index] )
        
            return this.all[index].update( update );

        return false;

    }

    /**
     * @param {number} targetIndex
     * @returns {List}
     */
    selectItem( targetIndex ) {

        if( this.all[targetIndex] && !this.isItemSelected( targetIndex ) )
            
            this.selected.push( targetIndex );

        return this;

    }

    /**
     * @param {number} targetIndex
     * @returns {List}
     */
    unselectItem( targetIndex ) {

        const position = this.selected.indexOf( targetIndex );

        if( position > -1 ) this.selected.splice( position, 1 );

        return this;

    }

    /**
     * @param {number} index
     * @returns {boolean}
     */
    isItemSelected( index ) {

        return this.selected.includes( index );

    }

    /**
     * @param {ListItem} item 
     */
    indexOf( item ) {

        return this.all.indexOf( item );

    }

    /**
     * @param {number} index
     * @returns {List}
     */
    removeItem( index ) {

        if( this.all[index] ) {

            this.all[index].belongsTo = null;
            this.all.splice( index, 1 );
            this.emptySelected();

        }

        return this;

    }

    /**
     * Helper function to save both the items and the currently selected indexes.
     * @returns {List}
     */
    saveListContent() {
        return this.saveItems().saveSelected();
    }

    /**
     * @returns {List}
     */
    saveItems() {

        if( this.store ) this.store.saveListItems( this.key, this.all );

        return this;

    }

    /**
     * @returns {List}
     */
    saveSelected() {

        if( this.store ) this.store.saveSelectedListItems( this.key, this.selected );

        return this;

    }

    /**
     * @returns {List}
     */
    import( items ) {

        return this.replaceItems( items.map( item => new ListItem( item ) ) );

    }

    copy() {
        return new List( this.key, this.name, { items: this.all, selectedItems: this.selected } );
    }

}

export default List;