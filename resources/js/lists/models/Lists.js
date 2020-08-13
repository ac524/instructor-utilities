import List from "./List";
import api from "../../api";
import store from "../../store";

// export const storageName = 'walker-lists';

/**
 * Collection class for managing defined lists.
 */
class Lists {

    /**
     * Lists class constructor.
     */
    constructor() {
        
        this.lists = {}
        this.currentListKey;

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

    async load() {

        try {

            const lists = await api.getLists();

            if( lists.length )

                store.addLists( lists );

        } catch( err ) {

            // TODO Add error display.
            console.log('Error fetching lists');

        }

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
     * @param {string} id
     * @returns {List}
     */
    get( id ) {

        return this.lists[id] || null;

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
     * @param {string} id
     * @returns {Lists}
     */
    selectList( id ) {

        const list = store.getList( id );

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
        const id = Date.now().toString() + this.all.length;

        const newList = new List( { id, name } );

        if( addList ) store.addList( newList );

        return newList;

    }

    /**
     * @param {string} id
     * @returns {Lists}
     */
    deleteList( id ) {

        if( this.get(id).isCurrent )

            this.currentListKey = null;

        delete this.lists[id];

        return this;

    }

}

export default Lists;