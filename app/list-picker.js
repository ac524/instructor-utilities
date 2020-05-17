// List Walker Application
function RandomListWalker() {

    Object.assign( this, {

        options: [
            'Group 1',
            'Group 2',
            'Group 3',
            'Group 4'
        ],
        selected: [],
        listEl: $('#all-groups'),
        resetButtonEl: $('#reset-list'),
        nextButtonEl: $('#next-group'),
        statusMessageEl: $('#status-message'),

        setStatusMessage: function( message, status = 'info' ) {

            let previousStatus = this.statusMessageEl.data( 'status' );

            if( previousStatus && previousStatus !== status ) 
        
                // Remove the previous status class
                this.statusMessageEl.removeClass( 'alert-'+ previousStatus );
        
            this.statusMessageEl
                .data( 'status', status )
                .addClass( 'alert-'+ status )
                .text( message );

        },

        displayItems: function() {

            let walker = this;
            walker.listEl.empty();

            this.options
                .forEach( groupName => {
        
                    walker.listEl.append(
                        `<li class="list-group-item">${groupName}</li>`
                    );
            
                } );

        },

        startList: function() {

            this.selected.length = 0;
            this.nextButtonEl.prop('disabled', false);
            this.setStatusMessage( this.selected.length + ' groups called on.' );
            this.displayItems();

        },

        nextListItem: function() {

            let walker = this;

            this.listEl
                .children( '.list-group-item-success' )
                .removeClass( 'list-group-item-success' )
                .addClass( 'list-group-item-dark' );

            if( this.options.length === this.selected.length ) {

                this.setStatusMessage( 'Presentations Complete', 'success' );

                this.nextButtonEl.prop('disabled', true);
                return;

            }

            let remainingGroups = this.options.filter( groupName => !walker.selected.includes( groupName ) ),
                nextGroup = remainingGroups[ Math.floor(Math.random() * remainingGroups.length) ],
                nextGroupIndex = this.options.indexOf( nextGroup );

            this.listEl.children().eq( nextGroupIndex ).addClass( 'list-group-item-success' );

            this.selected.push( nextGroup );

            let groupWord = 'group' + ( this.selected.length === 1 ? '' : 's' );

            this.setStatusMessage( `${this.selected.length} ${groupWord} called on.` );

        }

    });

    this.resetButtonEl.on( 'click', this.startList.bind( this ) );

    this.nextButtonEl.on('click', this.nextListItem.bind( this ) );

}

// Create the app
const walker = new RandomListWalker();

// Start the list walk through
walker.startList();