import List from "./models/lists/list";
import Lists from "./models/lists/lists";
import ListModal from "./components/ListModal";
import ListsControls from "./components/ListsControls";
import ListStatus from "./components/ListStatus";
import ListView from "./components/ListView";
import ListImportExport from "./components/ListImportExport";

import '../css/style.css';

/**
 * RandomListWalker class constructor
 */
class ListItemPicker {

    constructor() {

        this.lists = new Lists();

        this.listsControls = new ListsControls( this );
        this.status = new ListStatus( this );
        this.modal = new ListModal( this );
        this.view = new ListView( this );
        this.importExport = new ListImportExport( this );

        this.selectList( this.lists.currentList.key );
        
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

        this.lists.select( listKey );

        this.listsControls.renderListName();
        this.view.render();

    }

    /**
     * @returns {List}
     */
    newList() {

        const newList = this.lists.new( 'List '+ ( this.lists.count + 1 ) );

        this.selectList( newList.key );

        this.listsControls.render();

        return newList;

    }

    /**
     * @param {string} listKey 
     */
    deleteList( listKey ) {

        const wasCurrent = this.lists.get( listKey ).isCurrent;

        this.lists.delete( listKey );

        if( wasCurrent ) this.selectList( this.lists.currentList.key );

        this.listsControls.render();

        return this;

    }

    render() {

        this.listsControls.render();
        this.view.render();

    }

}

// Create the app
const itemPicker = new ListItemPicker();

// Start the list walk through
itemPicker.render();

export default ListItemPicker;