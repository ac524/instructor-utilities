import List from "../models/List";
import Lists from "../models/Lists";
import ListModal from "../components/ListModal";
import ListsControls from "../components/ListsControls";
import ListStatus from "../components/ListStatus";
import ListView from "../components/ListView";
import ListImportExport from "../components/ListImportExport";
import Store from "../store";

/**
 * RandomListWalker class constructor
 */
class ListItemPicker {

    constructor() {

        this.store = new Store;

        this.store.init();

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

        this.listsControls.renderListName();
        this.view.render();

    }

    /**
     * @returns {List}
     */
    newList() {

        const newList = this.lists.createList( 'List '+ ( this.lists.count + 1 ) );

        this.lists.save();

        this.selectList( newList.key );

        this.listsControls.render();

        return newList;

    }

    /**
     * @param {string} listKey 
     */
    deleteList( listKey ) {

        const wasCurrent = this.lists.get( listKey ).isCurrent;

        this.lists.deleteList( listKey );
        this.store.deleteList( listKey );

        if( wasCurrent ) this.selectList( this.lists.currentList.key );

        this.listsControls.render();

        return this;

    }

    render() {

        this.listsControls.render();
        this.view.render();

    }

}

export default ListItemPicker;