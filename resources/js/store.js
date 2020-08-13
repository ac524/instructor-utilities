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

        return this.lists.get(listId);

    }

    /**
     * @param {List} list 
     * @returns {Store}
     */
    addList( list ) {

        this.lists.addList( list );

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

        if( this.lists.get(id) )
    
            this.lists.deleteList(id);

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

}

const store = new Store();

export default store;