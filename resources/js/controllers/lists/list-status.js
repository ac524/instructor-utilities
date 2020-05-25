class ListStatus {

    constructor() {

        this.el = $('#status-message');

    }

    get currentStatus() {

        return this.el.data( 'status' );

    }

    set( message, status = 'info' ) {

        if( this.currentStatus && this.currentStatus !== status ) 
    
            // Remove the previous status class
            this.el.removeClass( 'alert-'+ this.currentStatus );
    
        this.el
            .data( 'status', status )
            .addClass( 'alert-'+ status )
            .text( message );

    }

}


export default ListStatus;