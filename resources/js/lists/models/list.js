import Lists from "./lists";
import ListItem from "./list-item";

import { storageName } from "./lists";

/**
 * Collection class for managing the entries and selection state for a target list.
 */
class List {

    /**
     * List class constructor
     * @param {string} key 
     * @param {string} name 
     * @param {Lists} collection 
     */
    constructor( key, name = '', collection ) {

        this.name = name;

        const storageKey = key +'-'+ storageName;
        const selectStorageKey = key +'-selected-'+ storageName;

        // Load or create the target list
        let list = JSON.parse( localStorage.getItem( storageKey ) ) || [];
        let selectList = JSON.parse( localStorage.getItem( selectStorageKey ) ) || [];

        // Migrate old data format if needed
        if( list[0] && typeof list[0] === 'string' )

            list = list.map( label => ({ label }) );

        list = list.map( item => new ListItem( item, this ) );

        Object.defineProperty( this, 'all', {
            get: () => list,
            set: function( value ) {
                list.length = 0;
                list.push( ...value );
            }
        } );
    
        Object.defineProperty( this, 'selected', { get: () => selectList } );
        Object.defineProperty( this, 'key', { get: () => key } );
        Object.defineProperty( this, 'storageKey', { get: () => storageKey } );
        Object.defineProperty( this, 'selectStorageKey', { get: () => selectStorageKey } );
        Object.defineProperty( this, 'belongsTo', { get: () => collection } );

    }

    get enabled() {

        return this.all.filter( item => !item.isDisabled );

    }

    get disabled() {

        return this.all.filter( item => item.isDisabled );

    }

    /**
     * @returns {boolean}
     */
    get isComplete() {

        return this.enabled.length && this.enabled.length === this.selected.length;

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
     * @returns {List}
     */
    updateItem( index, update ) {

        console.log( index, this.all );

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
     * @param {string} item
     * @returns {List}
     */
    add( label ) {

        this.all.push( new ListItem( { label }, this ) );
        this.save();

        return this;

    }

    /**
     * @param {number} index
     * @returns {List}
     */
    remove( index ) {

        this.all.splice( index, 1 );
        this.save();

        return this;

    }


    /**
     * @returns {List}
     */
    save() {

        localStorage.setItem( this.storageKey, JSON.stringify( this.all ) );

        return this;

    }

    /**
     * @returns {List}
     */
    saveSelected() {

        localStorage.setItem( this.selectStorageKey, JSON.stringify( this.selected ) );

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