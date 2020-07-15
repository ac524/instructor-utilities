import List from "../models/List";
import Lists from "../models/Lists";
import ListModal from "../components/ListModal";
import ListsControls from "../components/ListsControls";
import ListStatus from "../components/ListStatus";
import ListView from "../components/ListView";
import ListImportExport from "../components/ListImportExport";
import api from "../../api";
import Store from "../../store";

/**
 * RandomListWalker class constructor
 */
class ListItemPicker {

    constructor() {

        this.list = new Lists;

        this.listsControls = new ListsControls( this );
        this.status = new ListStatus( this );
        this.modal = new ListModal( this );
        this.view = new ListView( this );
        this.importExport = new ListImportExport( this );
        
    }

    /**
     * @returns {Lists}
     */
    get lists() {
        return this.store.lists;
    }

    async init() {

        const lists = await api.getLists();

        this.lists.addLists( lists.map( listOptions => new List( listOptions ) ) );

    }

    /**
     * @param {List} list 
     * @param {object} update 
     */
    updateListDetails( list, update ) {

        list.update( update );

        this.listsControls.render();

    }

    /**
     * @param {string} listKey 
     */
    selectList( listKey ) {

        this.lists.selectList( listKey );

        if( ! this.lists.currentList.isLoaded ) this.lists.currentList.load();

        this.listsControls.renderListName();
        this.view.render();

    }

    /**
     * @param {string} listKey 
     */
    deleteList( listKey ) {

        if( !this.lists.hasMultipleLists )

            // Exit early and prevent the delete action if we don't have more than one list.
            return this;

        const wasCurrent = this.lists.get( listKey ).isCurrent;

        this.lists.deleteList( listKey ).save();
        this.store.deleteList( listKey );

        if( wasCurrent ) this.selectList( this.lists.currentList.id );

        this.listsControls.render();

        return this;

    }

    render() {

        this.listsControls.render();
        this.view.render();

    }

}

export default ListItemPicker;