import List from "./lists/models/List";

const listFactory = listData => new List(listData);
const listArrayFactory = listsData => listsData.map( listFactory );

class Api {

    /**
     * @returns {Array.List}
     */
    async getLists() {

        const lists = await $.ajax( {
            url: "/api/lists",
            method: "GET"
        } );

        return listArrayFactory( lists );

    }

    createList( listData ) {
        
        // Execute and return an ajax call to create a new list

    }

    updateList( listId, listData ) {

        // Execute and return an ajax call to upate a list

    }

    deleteList( listId ) {

        // Execute and return an ajax call to delete a list

    }

    getListItems( listId ) {

        // Execute and return an ajax call to fetch all lists that belong to the target list.

    }

    createListItem( listItemData ) {
        
        // Execute and return an ajax call to create a new list item

    }

    updateListItem( listItemId, listItemData ) {
        
        // Execute and return an ajax call to create a new list item

    }

    deleteListItem( listItemId ) {
        
        // Execute and return an ajax call to delete a list item
        
    }

}

const api = new Api();

export default api;