import List from "./models/lists/list";
import Lists from "./models/lists/lists";
import ListImportExport from "./models/lists/lists";
import ListView from "./controllers/lists/list-view";
import ListStatus from "./controllers/lists/list-status";
// import ListControls from "./controllers/lists/list-controls";
import ListModal from "./components/ListModal";
import ListsControls from "./components/ListsControls";
import ListControls from "./components/ListControls";

import '../css/style.css';

/**
 * RandomListWalker class constructor
 */
class ListItemPicker {

    constructor() {

        this.lists = new Lists();
        this.currentList;
        this.importExport = new ListImportExport( this );
        this.view = new ListView();
        this.status = new ListStatus();
        this.listsControls = new ListsControls( this );
        this.listControls = new ListControls( this );
        this.modal = new ListModal( this );

        // this.controls.setupModal( this.modal );

        this.selectList( this.lists.currentListKey );
        
        this.view.displayListOptions( this.lists );
        
    }

    /**
     * 
     * @param {List} list 
     * @param {object} update 
     */
    updateListDetails( list, update ) {

        list.update( update );

        this.view.displayListOptions( this.lists );

        if( list.isCurrent )

            this.view.displayListName( this.currentList )


    }

    /**
     * @param {string} listKey 
     */
    selectList( listKey ) {

        this.lists.select( listKey );

        this.view
            .displayListName( this.lists.currentList )
            .render( this.lists.currentList );

    }

    /**
     * @returns {List}
     */
    newList() {

        const newList = this.lists.new( 'List '+ ( this.lists.count + 1 ) );

        this.selectList( newList.key );

        this.view.displayListOptions( this.lists );

        return newList;

    }

    /**
     * @param {string} listKey 
     */
    deleteList( listKey ) {

        const wasCurrent = this.lists.get( listKey ).isCurrent;

        this.lists.delete( listKey );

        if( wasCurrent ) this.selectList( this.lists.currentList.key );

        this.view.displayListOptions( this.lists );

        return this;

    }

    render() {

        this.view.render( this.lists.currentList );

    }

}

// Create the app
const walker = new ListItemPicker();

// Start the list walk through
walker.render();

export default ListItemPicker;