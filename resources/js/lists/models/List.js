import ListItem from "./ListItem";
import api from "../../api";

/**
 * Collection class for managing the entries and selection state for a target list.
 * 
 * @property {Array.<ListItem>} all
 */
class List {

    /**
     * List class constructor
     * @param {string} key 
     * @param {string} name 
     * @param {array} items 
     * @param {array} selectedItems
     */
    constructor( { id, name, Meta = [] } = {} ) {

        this.id = id;
        this.name = name;
        this.Meta = Meta;

        const expectedMetaArrays = ["selected", "disabled"];
        expectedMetaArrays.forEach( key => !this.getMeta(key) && this.Meta.push( { key, value: []  } ) );

        // Private properties to control access.
        const currentItems = [];

        let belongsTo = null;

        // Control the access of the array to ensure we are always working with the same array instance.
        Object.defineProperty( this, 'all', {
            get: () => currentItems,
            set: this.replaceItems.bind(this)
        } );

        Object.defineProperty( this, 'belongsTo', {
            get: () => belongsTo,
            set: ( lists ) => belongsTo = lists
        } );

        let isLoaded = false;
        Object.defineProperty( this, 'isLoaded', {
            get: () => isLoaded,
            set: ( value ) => isLoaded = value
        });

    }

    get selected() {
        return this.getMeta( "selected" );
    }

    set selected( itemIndexes ) {
        this.selected.length = 0;
        this.selected.push( ...itemIndexes );
    }

    get disabled() {
        return this.getMeta( "disabled" );
    }

    /**
     * List of enabled items.
     */
    get enabledItems() {

        return this.all.filter( item => !this.disabled.includes( item.id ) );

    }

    /**
     * List of disabled items.
     */
    get disabledItems() {

        return this.all.filter( item => this.disabled.includes( item.id ) );

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

        return this.belongsTo && this.belongsTo.count
        
            ? this.id === this.belongsTo.currentList.id
            
            : false;
            
    }

    get currentItemId() {

        return this.selected[ this.selected.length - 1 ] >= 0 ? this.selected[ this.selected.length - 1 ] : null;

    }

    /**
     * @returns {ListItem}
     */
    get currentItem() {

        return this.getItem(this.currentItemId) || null;

    }

    /**
     * @returns {Store}
     */
    get store() {

        return this.belongsTo ? this.belongsTo.store : null;

    }

    async loadItems() {

        if( this.isLoaded ) return;

        try {
            
            this.isLoaded = true;
            this.addItems( await api.getListItems( this.id ) );

        } catch( err ) {

            this.isLoaded = false;
            console.log( err );
            console.log( "Error fetching list items" );
            
        }

    }

    load() {

        if( this.store ) {

            const { list, selectList } = this.store.loadListItemData( this.id );

            if( list ) this.all = list;

            if( selectList ) this.selected = selectList;

            this.isLoaded = true;

        }

        return this;

    }

    getMeta( key ) {
        const meta = this.Meta.find( meta => meta.key === key );
        return meta ? meta.value : null;
    }

    /**
     * @param {Object} props
     * @param {string} props.name
     * @returns {(false|object)} An object with the updated properties and values, or false if no properties were updated.
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

        const err = new Error();

        this.selected.length = 0;

        return this;

    }

    /**
     * @returns {List}
     */
    selectRandomItem() {

        let unusedIds = this.enabledItems.map( ( { id } ) => id ).filter( ( id ) => !this.selected.includes( id ) );

        if( unusedIds.length ) {

            let nextItemId = unusedIds[ Math.floor(Math.random() * unusedIds.length) ];
    
            this.selectItem( nextItemId );

        }

        return this;

    }


    /**
     * @param {string} item
     * @returns {ListItem}
     */
    createItem( name ) {

        const newItem = new ListItem( { name } );

        this.addItem( newItem );

        return newItem;

    }

    /**
     * @param {ListItem} listItem
     * @returns {List}
     */
    addItem( listItem ) {

        listItem.ListId = this.id;

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
     * @param {number} itemId 
     * @returns {ListItem}
     */
    getItem( itemId ) {

        return this.all.find (({id}) => id === itemId);

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
     * @param {number} itemId
     * @returns {List}
     */
    selectItem( itemId ) {

        if( !this.isItemSelected( itemId ) )
            
            this.selected.push( itemId );

        return this;

    }

    /**
     * @param {number} itemId
     * @returns {List}
     */
    unselectItem( itemId ) {

        const position = this.selected.indexOf( itemId );

        if( position > -1 ) this.selected.splice( position, 1 );

        return this;

    }

    /**
     * @param {number} itemId
     * @returns {boolean}
     */
    isItemSelected( itemId ) {

        return this.selected.includes( itemId );

    }

    /**
     * @param {number} itemId
     * @returns {List}
     */
    disableItem( itemId ) {

        if( !this.isItemDisabled( itemId ) )
            
            this.disabled.push( itemId );

        return this;

    }

    /**
     * @param {number} itemId
     * @returns {List}
     */
    enableItem( itemId ) {

        const position = this.disabled.indexOf( itemId );

        if( position > -1 ) this.disabled.splice( position, 1 );

        return this;

    }

    /**
     * @param {number} itemId
     * @returns {boolean}
     */
    isItemDisabled( itemId ) {

        return this.disabled.includes( itemId );

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

        if( this.store ) this.store.saveListItems( this.id, this.all );

        return this;

    }

    /**
     * @returns {List}
     */
    saveSelected() {

        if( this.store ) this.store.saveSelectedListItems( this.id, this.selected );

        return this;

    }

    /**
     * @returns {List}
     */
    import( items ) {

        return this.replaceItems( items.map( item => new ListItem( item ) ) );

    }

    copy() {
        return new List( this.id, this.name, { items: this.all, selectedItems: this.selected } );
    }

}

export default List;