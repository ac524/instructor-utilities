import Lists from "./lists/models/Lists";
import ListItem from "./lists/models/ListItem";
import List from "./lists/models/List";

export class Store {

    constructor() {

        this.lists = new Lists;

    }

    /**
     * @param {number} listId 
     * @returns {List}
     */
    getList( listId ) {
        return this.lists[listId] || null;
    }

    /**
     * @param {List} list 
     * @returns {Store}
     */
    addList( list ) {

        this.lists[list.id] = list;

        return this;

    }

    /**
     * 
     * @param {Array.<List>} lists
     * @returns {Store}
     */
    addLists( lists ) {

        lists.forEach( this.addList.bind(this) );

        return this;

    }

    /**
     * @param {string} id
     * @returns {Store}
     */
    deleteList( id ) {

        if( this.lists[id] )
    
            delete this.lists[id];

        return this;

    }

    /**
     * @param {number} listId 
     * @param {ListItem} listItem 
     * @returns {Store}
     */
    addListItem( listId, listItem ) {

        this.getList( listId ).addItem( listItem );

        return this;

    }

    removeListItem( listId, listItemId ) {

        this.getList( listId ).removeItem( listItem );

        return this;

    }

    /** OLD CODE TO BE REMOVED */
    saveLists() {

        if( this.lists ) {

            const serialize = ( lists ) => JSON.stringify( Object.fromEntries(Object.entries( lists ).map( ([ key, value ]) => [ key, value.name ] )) );

            localStorage.setItem( this.key, serialize( this.lists.lists ) );

        }

        return this;

    }

    loadListsData() {

        const deserialize = ( lists ) => Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => new List( key, name ) );

        return deserialize( localStorage.getItem( this.key ) || '{}' );

    }

    loadListItemData( listKey ) {

        // Load or create the target list
        let list = JSON.parse( localStorage.getItem( this.getListStorageKey( listKey ) ) ) || [];
        let selectList = JSON.parse( localStorage.getItem( this.getListSelectedStorageKey( listKey ) ) ) || [];

        // Migrate old data format if needed
        if( list[0] && typeof list[0] === 'string' )

            list = list.map( label => ({ label }) );

        return {
            list: list.map( item => new ListItem( item ) ),
            selectList
        };

    }

    saveListItems( listKey, items ) {

        localStorage.setItem( this.getListStorageKey( listKey ), JSON.stringify( items ) );

        return this;

    }

    saveSelectedListItems( listKey, selected ) {

        localStorage.setItem( this.getListSelectedStorageKey( listKey ), JSON.stringify( selected ) );

        return this;

    }

    /**
     * @param {Lists} lists
     * @returns {Lists}
     */
    setLists( lists ) {

        this.lists = lists;

        this.lists.store = this;

        return this;

    }

    /**
     * @param {string} listKey 
     */
    deleteList( listKey ) {
        localStorage.removeItem( this.getListStorageKey( listKey ) );
        localStorage.removeItem( this.getListSelectedStorageKey( listKey ) );
    }

    /**
     * @param {string} listKey 
     */
    getListStorageKey( listKey ) {
        return listKey +'-'+ this.key;
    }

    /**
     * @param {string} listKey 
     */
    getListSelectedStorageKey( listKey ) {
        return listKey +'-selected-'+ this.key;
    }

    /**
     * @returns {Lists}
     */
    init() {
        return this.setLists( new Lists( this.loadListsData() ) );
    }

}

const store = new Store();

export default store;