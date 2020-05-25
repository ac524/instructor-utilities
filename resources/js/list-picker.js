import List from "./models/lists/list";
import Lists from "./models/lists/lists";
import ListImportExport from "./models/lists/lists";
import ListView from "./controllers/lists/list-view";
import ListStatus from "./controllers/lists/list-status";
import ListControls from "./controllers/lists/list-controls";
import ListModal from "./controllers/lists/list-modal";

import '../css/style.css';

/**
 * RandomListWalker class constructor
 */
class RandomListWalker {

    constructor() {

        this.lists = new Lists();
        this.currentList;
        this.importExport = new ListImportExport( this );
        this.view = new ListView();
        this.status = new ListStatus();
        this.controls = new ListControls( this );
        this.modal = new ListModal();

        this.controls.setupModal( this.modal );

        this.selectList( this.lists.getIndex(0) || this.lists.new() );
        this.view.displayListOptions( this.lists, this.currentList.key );
        
    }

    /**
     * @param {List} list 
     */
    selectList( list ) {

        this.currentList = list;
        this.view
            .displayListName( this.currentList )
            .render( this.currentList );

    }

    render() {

        this.view.render( this.currentList );

    }

}

// Create the app
const walker = new RandomListWalker();

// Start the list walk through
walker.render();