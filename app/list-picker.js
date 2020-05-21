const storageName = 'walker-lists';

/**
 * ItemList class constructor
 * @param {string} key 
 */
function ItemList( key, name = '' ) {

    const storageKey = key +'-'+ storageName;
    // Load or create the target list
    let list = JSON.parse( localStorage.getItem( storageKey ) ) || [];

    Object.defineProperty( this, 'all', {
        get: function() {
            return list;
        },
        set: function( value ) {
            list = value;
        }
    } )

    Object.assign( this, {
        
        name: name,

        save: function() {

            console.log( 'save', storageKey, list );

            localStorage.setItem( storageKey, JSON.stringify( list ) );

        },

        get: function( index ) {

            return list[index];

        },

        update: function( index, value ) {

            if( value !== list[index] ) {
                list[index] = value;
                this.save();
            }

        },

        add: function( item ) {

            if( ! list.includes( item ) ) {

                list.push( item );
                this.save();

            }

        },

        remove: function( index ) {

            list.splice( index, 1 );
            this.save();

        }

    });

}

/**
 * ItemLists class constructor
 */
function ItemLists() {

    const deserialize = ( lists ) => Object.fromEntries( Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => [ key, new ItemList( key, name ) ] ) );
    const serialize = ( lists ) => JSON.stringify( Object.fromEntries(Object.entries( lists ).map( ([ key, value ]) => [ key, value.name ] )) );

    const lists = deserialize( localStorage.getItem( storageName ) || '{}' );

    // console.log( lists );

    Object.defineProperty( this, 'all', {
        get: function() {
            return Object.entries( lists );
        }
    } )

    Object.assign( this, {

        save: function() {

            localStorage.setItem( storageName, serialize( lists ) );

            return this;

        },

        getIndex: function( index ) {

            const entries = Object.entries( lists );
            return entries[index] ? entries[index][1] : false;

        },
        
        get: function( key ) {

            return lists[key] || false;

        },

        new: function( name = 'Default' ) {
            
            // Use the current time as a key
            const key = Date.now();

            const newList = new ItemList( key, name );

            lists[key] = newList;

            this.save();

            return newList;

        },

        delete: function( index ) {

            lists.splice( index, 1 );

            return this;

        }

    })

}

function ListImportExport( walker ) {

    Object.assign( this, {
        importButtonEl: $('#import-list'),
        exportButtonEl: $('#export-list'),
        importExportEl: $('#import-export'),
    } );

    const isOpen = () => this.importExportEl.is(':visible');
    const toggle = () => this.importExportEl.toggle();

    const importList = () => {

        if( isOpen() ) {
            
            var newList = JSON.parse( this.importExportEl.find('.form-control').val() );

            if( newList ) {

                walker.currentList.all = newList;
                walker.currentList.save();
                walker.startList();

            }

        }

        toggle();

    }

    const exportList = () => {

        if( !isOpen() ) {
            
            this.importExportEl.find('.form-control').val( JSON.stringify( walker.currentList.all ) );

        }

        toggle();

    }

    this.importButtonEl.on( 'click', importList );
    this.exportButtonEl.on( 'click', exportList );

}

/**
 * RandomListWalker class constructor
 */
function RandomListWalker() {

    const lists = new ItemLists();
    const walker = this;

    Object.assign( this, {
        lists: lists,
        currentList: lists.getIndex(0) || lists.new(),
        selected: [],
        importExport: new ListImportExport( this ),
        listEl: $('#all-groups'),
        addItemButtonEl: $('#add-item'),
        resetButtonEl: $('#reset-list'),
        nextButtonEl: $('#next-group'),
        statusMessageEl: $('#status-message'),
        currentItemEl: $('#current-name'),

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

        addItem: function() {

            this.currentList.add( 'Item '+ (this.currentList.all.length + 1) );

            this.startList();

        },

        displayItems: function() {

            this.listEl.empty();

            this.currentList.all
                .forEach( ( groupName, i ) => {
                    
                    const itemEl = $(
                        `<div class="input-group list-group-item col-12 col-sm-6 col-md-4">
                            <input type="text" value="${groupName}" class="form-control item-label">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <input class="toggle-select" type="checkbox" aria-label="Checkbox for toggling an item's selection">
                                </div>
                                <button class="btn btn-outline-danger" data-action="remove">X</span>
                            </div>
                        </div>`
                    );
                    
                    itemEl.data( 'index', i );

                    this.listEl.append( itemEl );
            
                } );

        },

        startList: function() {

            this.selected.length = 0;
            this.currentItemEl.text( 'None' );
            this.nextButtonEl.prop('disabled', false);
            this.setStatusMessage( this.selected.length + ' items selected.' );
            this.displayItems();

        },

        nextListItem: function() {

            this.listEl
                .children( '.list-group-item-success' )
                .removeClass( 'list-group-item-success' )
                .addClass( 'list-group-item-dark' );

            if( this.currentList.all.length === this.selected.length ) {

                this.setStatusMessage( 'List Complete', 'success' );

                this.nextButtonEl.prop('disabled', true);
                return;

            }

            let remainingGroups = this.currentList.all.filter( groupName => !this.selected.includes( groupName ) ),
                nextItem = remainingGroups[ Math.floor(Math.random() * remainingGroups.length) ],
                nextGroupIndex = this.currentList.all.indexOf( nextItem );

            const itemEl = this.listEl.children().eq( nextGroupIndex ).addClass( 'list-group-item-success' );
            const checkboxEl = itemEl.find('.toggle-select');

            console.log(checkboxEl);

            checkboxEl.attr("checked", !checkboxEl.attr("checked"));

            this.selected.push( nextItem );

            let itemWord = 'item' + ( this.selected.length === 1 ? '' : 's' );

            this.currentItemEl.text( nextItem );
            this.setStatusMessage( `${this.selected.length} ${itemWord} selected.` );

        }

    });

    this.listEl
        .on( 'keyup', '.item-label', function() {

            const inputEl = $(this);
            const itemIndex = inputEl.closest('.input-group').data( 'index' );

            walker.currentList.update( itemIndex, inputEl.val() );

        } )
        .on( 'change', '.toggle-select', function() {

            const checkboxEl = $(this);
            const itemIndex = checkboxEl.closest('.input-group').data( 'index' );
            const item = walker.currentList.get( itemIndex );

            if( walker.selected.includes( item ) ) {

                walker.selected.splice( walker.selected.indexOf( item ), 1 );
                walker.listEl.children().eq( itemIndex ).removeClass( 'list-group-item-success list-group-item-dark' );

            } else {

                walker.listEl
                    .children( '.list-group-item-success' )
                    .removeClass( 'list-group-item-success' )
                    .addClass( 'list-group-item-dark' );

                walker.listEl.children().eq( itemIndex ).addClass( 'list-group-item-success' );

                walker.selected.push( item );

                let itemWord = 'item' + ( walker.selected.length === 1 ? '' : 's' );

                walker.currentItemEl.text( item );
                walker.setStatusMessage( `${walker.selected.length} ${itemWord} selected.` );

            }

        } )
        .on( 'click', '[data-action]', function() {

            const buttonEl = $(this);
            const itemIndex = buttonEl.closest('.input-group').data( 'index' );
            const action = buttonEl.data( 'action' );

            if( action === 'remove' ) {

                walker.currentList.remove( itemIndex );
                walker.startList();

            }

        } );

    this.addItemButtonEl.on( 'click', this.addItem.bind( this ) );

    this.resetButtonEl.on( 'click', this.startList.bind( this ) );

    this.nextButtonEl.on('click', this.nextListItem.bind( this ) );

}

// Create the app
const walker = new RandomListWalker();

// Start the list walk through
walker.startList();