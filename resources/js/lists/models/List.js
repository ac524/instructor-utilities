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

        const addList = ( listItems ) => listItems.forEach( this.addItem.bind( this ) );

        Object.defineProperty( this, 'all', {
            get: () => currentItems,
            set: function( newItems ) {
                currentItems.length = 0;
                addList( newItems );
            }
        } );
    
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
    get enabled() {

        return this.all.filter( item => !item.isDisabled );

    }

    /**
     * List of disabled items.
     */
    get disabled() {

        return this.all.filter( item => item.isDisabled );

    }

    /**
     * @returns {boolean}
     */
    get isComplete() {

        return this.enabled.length ? this.enabled.length === this.selected.length : false;

    }

    /**
     * @returns {boolean}
     */
    get isCurrent() {
        return this.key === this.belongsTo.currentListKey;
    }

    get currentIndex() {

        return this.selected[ this.selected.length - 1 ] >= 0 ? this.selected[ this.selected.length - 1 ] : null;

    }

    /**
     * @returns {ListItem}
     */
    get current() {

        return this.all[this.currentIndex] || null;

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

    update( { name } ) {

        this.name = name;

        this.belongsTo.save();

        return this;

    }

    /**
     * @returns {List}
     */
    resetSelected() {

        this.selected.length = 0;
        this.saveSelected();

        return this;

    }

    /**
     * @returns {List}
     */
    selectRandom() {

        let unusedIndexes = this.enabled.map( ( { index } ) => index ).filter( ( i ) => !this.selected.includes( i ) );

        if( unusedIndexes.length ) {

            let nextItemIndex = unusedIndexes[ Math.floor(Math.random() * unusedIndexes.length) ];
    
            this.select( nextItemIndex );

        }

        return this;

    }


    /**
     * @param {string} item
     * @returns {List}
     */
    createItem( label ) {

        this.addItem( new ListItem( { label } ) );

        return this;

    }

    /**
     * @param {ListItem} listItem 
     */
    addItem( listItem ) {

        listItem.belongsTo = this;

        this.all.push( listItem );
        this.save();

        return this;
        
    }

    /**
     * @returns {List}
     */
    updateItem( index, update ) {

        this.all[index].update( update );

        return this;

    }

    /**
     * @param {number} targetIndex
     * @returns {List}
     */
    select( targetIndex ) {

        if( !this.isSelected( targetIndex ) ) {
            
            this.selected.push( targetIndex );
            this.saveSelected();

        }

        return this;

    }

    /**
     * @param {number} targetIndex
     * @returns {List}
     */
    unselect( targetIndex ) {

        const position = this.selected.indexOf( targetIndex );

        if( position > -1 ) {

            this.selected.splice( position, 1 );
            this.saveSelected();

        }


        return this;

    }

    /**
     * @param {number} index
     * @returns {boolean}
     */
    isSelected( index ) {

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
    remove( index ) {

        this.all[index].belongsTo = null;

        this.all.splice( index, 1 );
        this.save();

        return this;

    }


    /**
     * @returns {List}
     */
    save() {

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

        this.all = items.map( item => new ListItem( item, this ) );
        this.save();

        return this;

    }

    copy() {
        return new List( this.key, this.name, this.belongsTo );
    }

}

export default List;