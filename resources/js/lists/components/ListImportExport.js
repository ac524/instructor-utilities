import List from "../models/List";
import ListItemPicker from "../controllers/ListItemPicker";

class ListImportExport {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        this.importButtonEl = $('#import-list');
        this.exportButtonEl = $('#export-list');
        this.importExportEl = $('#import-export');
    
        this.importButtonEl.on( 'click', this.importList.bind(this) );
        this.exportButtonEl.on( 'click', this.exportList.bind(this) );

    }

    /**
     * @returns {List}
     */
    get currentList() {
        return this.app.lists.currentList;
    }

    exportList() {
    
        if( !this.isOpen() ) {
            
            this.importExportEl.find('.form-control').val( JSON.stringify( this.currentList.all ) );

        }

        this.toggle();

    }

    importList() {

        if( this.isOpen() ) {
            
            var newList = JSON.parse( this.importExportEl.find('.form-control').val() );

            if( newList ) {

                this.currentList
                    .emptySelected()
                    .import(newList)
                    .saveListContent();
                    
                this.app.view.render();

            }

        }

        this.toggle();

    }

    isOpen() { return this.importExportEl.is(':visible') }

    toggle() { return this.importExportEl.toggle() }

}

export default ListImportExport;