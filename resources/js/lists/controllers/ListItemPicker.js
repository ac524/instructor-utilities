import List from "../models/List";
import Lists from "../models/Lists";
import ListModal from "../components/ListModal";
import ListsControls from "../components/ListsControls";
import ListStatus from "../components/ListStatus";
import ListView from "../components/ListView";
import ListImportExport from "../components/ListImportExport";
import api from "../../api";
import store from "../../store";

/**
 * RandomListWalker class constructor
 */
class ListItemPicker {

    constructor() {

        this.lists = new Lists;

        this.listsControls = new ListsControls( this );
        this.status = new ListStatus( this );
        this.modal = new ListModal( this );
        this.view = new ListView( this );
        this.importExport = new ListImportExport( this );
        
    }

    async init() {

        await this.lists.load();

        // if( !this.lists.count ) {
        //     this.lists.createList();
        //     this.lists.save();
        // }

        const firstList = this.lists.getByIndex(0);
        this.selectList( firstList.id );

        this.render();

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
     * @param {string} listId 
     */
    async selectList( listId ) {

        this.lists.selectList( listId );

        if( ! this.lists.currentList.isLoaded )
        
            await this.lists.currentList.loadItems();

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
        // this.view.render();

    }

}

export default ListItemPicker;