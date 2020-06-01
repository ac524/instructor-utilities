import List from "./List";

export const storageName = 'walker-lists';

/**
 * Collection class for managing defined lists.
 */
class Lists {

    /**
     * Lists class constructor.
     */
    constructor() {

        const deserialize = ( lists ) => Object.fromEntries( Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => [ key, new List( key, name, this ) ] ) );
        const serialize = ( lists ) => JSON.stringify( Object.fromEntries(Object.entries( lists ).map( ([ key, value ]) => [ key, value.name ] )) );
    
        const lists = deserialize( localStorage.getItem( storageName ) || '{}' );

        this.currentListKey;

        Object.defineProperty( this, 'lists', {
            get: function() {
                return lists;
            }
        } );

        Object.defineProperty( this, 'save', {
            value: () => {

                localStorage.setItem( storageName, serialize( lists ) );
    
                return this;
    
            },
            writable: false
        } );

        // Create a default list if there isn't one
        if( ! this.all.length ) this.lists.new();

    }

    get currentList() {

        return this.currentListKey

            ? this.get( this.currentListKey )

            : this.getIndex( 0 )

    }

    get all() {
        return Object.entries( this.lists );
    }

    get count() {
        return this.all.length;
    }

    /**
     * @param {number} index
     * @returns {List}
     */
    getIndex( index ) {

        return this.all[index] ? this.all[index][1] : null;

    }

    /**
     * @param {string} key
     * @returns {List}
     */
    get( key ) {

        return this.lists[key] || false;

    }


    /**
     * @param {number} index
     * @returns {Lists}
     */
    selectIndex( index ) {

        this.currentListKey = this.getIndex(0).key;

        return this;

    }


    /**
     * @param {string} key
     * @returns {Lists}
     */
    select( key ) {

        this.currentListKey = key;

        return this;

    }

    /**
     * @param {string} name 
     * @returns {List}
     */
    new( name = 'Default' ) {
            
        // Use the current time as a key
        const key = Date.now().toString();

        const newList = new List( key, name, this );

        this.lists[key] = newList;

        this.save();

        return newList;

    }

    /**
     * @param {string} key
     * @returns {Lists}
     */
    delete( key ) {

        if( this.lists[key].isCurrent )

            this.currentListKey = null;

        delete this.lists[key];

        this.save();

        return this;

    }

}

export default Lists;