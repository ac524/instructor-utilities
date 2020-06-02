import Lists from "./models/Lists";
import ListItem from "./models/ListItem";
import List from "./models/List";

export class Store {

    constructor() {

        this.key = 'walker-lists';

        this.lists;

    }

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

        const storageKey = listKey +'-'+ this.key;
        const selectStorageKey = listKey +'-selected-'+ this.key;

        // Load or create the target list
        let list = JSON.parse( localStorage.getItem( storageKey ) ) || [];
        let selectList = JSON.parse( localStorage.getItem( selectStorageKey ) ) || [];

        // Migrate old data format if needed
        if( list[0] && typeof list[0] === 'string' )

            list = list.map( label => ({ label }) );

        return {
            list: list.map( item => new ListItem( item, this ) ),
            selectList
        };

    }

    saveListItems( listKey, items ) {

        const storageKey = listKey +'-'+ this.key;

        localStorage.setItem( storageKey, JSON.stringify( items ) );

        return this;

    }

    saveSelectedListItems( listKey, selected ) {

        const selectStorageKey = listKey +'-selected-'+ this.key;

        localStorage.setItem( selectStorageKey, JSON.stringify( selected ) );

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
     * @returns {Lists}
     */
    init() {

        return this.setLists( new Lists( this.loadListsData() ) );

    }

}

export default Store;