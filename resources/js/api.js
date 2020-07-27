import List from "./lists/models/List";
import ListItem from "./lists/models/ListItem";

const listFactory = listData => new List(listData);
const listArrayFactory = listsData => listsData.map( listFactory );

const listItemFactory = listItemData => new ListItem(listItemData);
const listItemArrayFactory = listItemsData => listItemsData.map( listItemFactory );

class Api {

    /**
     * Ajax wrapper to centralize base error handling.
     * @param {object} options
     * @param {string} options.url
     * @param {string} options.method
     * @param {object} options.data
     */
    async request( { url, method = "GET", data } ) {

        try {

            return await $.ajax({ url, method, data });

        } catch(err) {

            // TODO Build in display error functionality to help the user understand what went wrong.
            // TODO Deside on the return type for requests that fail and how failed requests should be handled in usage.
            console.log( err );

        }

    }

    /**
     * @returns {Array.List}
     */
    async getLists() {

        const lists = await this.request({
            url: "/api/lists",
            method: "GET"
        });

        return listArrayFactory( lists );

    }

    async createList( listData ) {
        
        // Execute and return an ajax call to create a new list
        const newList = await this.request({
            url: "/api/lists",
            method: "POST",
            data: listData
        });

        return listFactory( newList );

    }

    async updateList( listId, listData ) {

        // Execute and return an ajax call to update a list
        const updatedList = await this.request({
            url: `/api/lists/${listId}`,
            method: "PATCH",
            data: listData
        });

        return listFactory( updatedList );

    }

    async deleteList( listId ) {

        // Execute and return an ajax call to delete a list
        return await this.request({
            url: `/api/lists/${listId}`,
            method: "DELETE",
        });

    }

    async getListItems( listId ) {

        // Execute and return an ajax call to fetch all list items that belong to the target list.
        const listItemsData = await this.request({
            url: `/api/lists/${listId}/items`,
            method: "GET"
        });

        return listItemArrayFactory( listItemsData );

    }

    async createListItem( listId, listItemData ) {
        
        // Execute and return an ajax call to create a new list item
        const newListItem = await this.request({
            url: `/api/lists/${listId}/items`,
            method: "POST",
            data: listItemData
        });

        return listItemFactory( newListItem );

    }

    async updateListItem( listItemId, listItemData ) {
        
        // Execute and return an ajax call to Update a new list item
        const updatedListItem = await this.request({
            url: `/api/listitems/${listItemId}`,
            method: "PATCH",
            data: listItemData
        });

        return listItemFactory( updatedListItem );
        
    }

    async deleteListItem( listItemId ) {
        
        // Execute and return an ajax call to delete a list item
        return await this.request({
            url: `/api/listitems/${listItemId}`,
            method: "DELETE"
        });

    }

    async selectListItem( listId, listItemId ) {

        await this.request({
            url: `/api/lists/${listId}/select/${listItemId}`,
            method: "POST"
        });

    }

}

const api = new Api();

export default api;