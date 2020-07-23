import List from "./lists/models/List";
import ListItem from "./lists/models/ListItem";

const listFactory = listData => new List(listData);
const listArrayFactory = listsData => listsData.map( listFactory );

const listItemFactory = listItemData => new ListItem(listItemData);
const listItemArrayFactory = listItemsData => listItemsData.map( listItemFactory );

class Api {

    /**
     * @returns {Array.List}
     */
    async getLists() {

        const lists = await $.ajax({
            url: "/api/lists",
            method: "GET"
        });

        return listArrayFactory( lists );

    }

    async createList( listData ) {
        
        // Execute and return an ajax call to create a new list
        const newList = await $.ajax({
            url: "/api/lists",
            method: "POST",
            data: listData
        });

        return listFactory( newList );

    }

    async updateList( listId, listData ) {

        // Execute and return an ajax call to update a list
        const updatedList = await $.ajax({
            url: `/api/lists/${listId}`,
            method: "PUT",
            data: listData
        });

        return listFactory( updatedList );

    }

    async deleteList( listId ) {

        // Execute and return an ajax call to delete a list

    }

    async getListItems( listId ) {

        // Execute and return an ajax call to fetch all list items that belong to the target list.
        const listItemsData = await $.ajax({
            url: `/api/lists/${listId}/items`,
            method: "GET"
        });

        return listItemArrayFactory( listItemsData );

    }

    async createListItem( listId, listItemData ) {
        
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