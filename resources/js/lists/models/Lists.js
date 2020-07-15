import List from "./List";
import Store from "../../store";

// export const storageName = 'walker-lists';

/**
 * Collection class for managing defined lists.
 */
class Lists {

    /**
     * Lists class constructor.
     */
    constructor( lists = [] ) {

        // const deserialize = ( lists ) => Object.fromEntries( Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => [ key, new List( key, name, this ) ] ) );
        // const serialize = ( lists ) => JSON.stringify( Object.fromEntries(Object.entries( lists ).map( ([ key, value ]) => [ key, value.name ] )) );
    
        // const lists = deserialize( localStorage.getItem( storageName ) || '{}' );

        this.currentListKey;

        // TODO convert plain object into a Map.
        this.lists = {};

        if( lists.length )

            lists.forEach( (item) => this.addList( item ) );

        let store = null;
        Object.defineProperty( this, 'store', {
            /**
             * @returns {Store}
             */
            get: () => store,
            set: (newStore) => store = newStore
        } );

    }

    get currentList() {

        return this.currentListKey

            ? this.get( this.currentListKey )

            : this.getByIndex( 0 )

    }

    get all() {
        return Object.entries( this.lists );
    }

    get count() {
        return this.all.length;
    }

    get hasMultipleLists() {
        return this.count > 1;
    }

    save() {

        if( this.store ) this.store.saveLists();

        return this;

    }

    /**
     * @param {number} index
     * @returns {List}
     */
    getByIndex( index ) {

        return this.all[index] ? this.all[index][1] : null;

    }

    /**
     * @param {string} key
     * @returns {List}
     */
    get( key ) {

        return this.lists[key] || null;

    }


    /**
     * @param {number} index
     * @returns {Lists}
     */
    selectIndex( index ) {

        const list = this.getByIndex(index);

        if( list )

            this.currentListKey = list.id;

        return this;

    }


    /**
     * @param {string} key
     * @returns {Lists}
     */
    selectList( key ) {

        const list = this.get( key );

        if( list )

            this.currentListKey = list.id;

        return this;

    }

    /**
     * @param {List} list 
     * @returns {Lists}
     */
    addList( list ) {

        this.lists[list.id] = list;

        list.belongsTo = this;

        return this;

    }

    /**
     * 
     * @param {Array.<List>} lists
     * @returns {Lists}
     */
    addLists( lists ) {

        lists.forEach( this.addList.bind(this) );

        return this;

    }

    /**
     * @param {string} name 
     * @param {boolean} addList
     * TODO Update unit tests for the new addList flag parameter
     * @returns {List}
     */
    createList( name = 'Default', addList = true ) {
            
        // Use the current time as a key
        // TODO update to a generated string
        const key = Date.now().toString() + this.all.length;

        const newList = new List( key, name );

        if( addList ) this.addList( newList );

        return newList;

    }

    /**
     * @param {string} key
     * @returns {Lists}
     */
    deleteList( key ) {

        if( this.lists[key] ) {

            if( this.lists[key].isCurrent )
    
                this.currentListKey = null;
    
            delete this.lists[key];

        }

        return this;

    }

}

export default Lists;