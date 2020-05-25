class ListImportExport {

    constructor( walker ) {

        const importButtonEl = $('#import-list');
        const exportButtonEl = $('#export-list');
        const importExportEl = $('#import-export');
    
        importButtonEl.on( 'click', this.importList.bind(this) );
        exportButtonEl.on( 'click', this.exportList.bind(this) );

        Object.assign( this, {
            walker,
            importButtonEl,
            exportButtonEl,
            importExportEl
        } );

    }

    exportList() {
    
        if( !this.isOpen() ) {
            
            this.importExportEl.find('.form-control').val( JSON.stringify( this.walker.currentList.all ) );

        }

        this.toggle();

    }

    importList() {

        if( this.isOpen() ) {
            
            var newList = JSON.parse( this.importExportEl.find('.form-control').val() );

            if( newList ) {

                this.walker.currentList.all = newList;
                this.walker.currentList.save();
                this.walker.render();

            }

        }

        this.toggle();

    }

    isOpen() { return this.importExportEl.is(':visible') }

    toggle() { return this.importExportEl.toggle() }

}

export default ListImportExport;