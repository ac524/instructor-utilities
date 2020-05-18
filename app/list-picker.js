const storageName = 'walker-lists';

/**
 * ItemList class constructor
 * @param {string} key 
 */
function ItemList( key, name = '' ) {

    const storageKey = key +'-'+ storageName;
    // Load or create the target list
    const list = JSON.parse( localStorage.getItem( storageKey ) ) || [];

    // console.log( 'create list', list );

    Object.defineProperty( this, 'all', {
        get: function() {
            return list;
        }
    } )

    Object.assign( this, {
        
        name: name,

        save: function() {

            localStorage.setItem( storageKey, JSON.stringify( list ) );

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

        remove: function( item ) {

            const index = list.indexOf( item );

            if( index > -1 )

                list.splice( index, 1 );

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

            // console.log( 'save', serialize( lists ) );

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

            let walker = this;
            walker.listEl.empty();

            this.currentList.all
                .forEach( ( groupName, i ) => {
                    
                    const inputEl = $(`<input value="${groupName}" class="list-group-item col-4" />`);
                    
                    inputEl.data( 'index', i );

                    walker.listEl.append( inputEl );
            
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

            let walker = this;

            this.listEl
                .children( '.list-group-item-success' )
                .removeClass( 'list-group-item-success' )
                .addClass( 'list-group-item-dark' );

            if( this.currentList.all.length === this.selected.length ) {

                this.setStatusMessage( 'List Complete', 'success' );

                this.nextButtonEl.prop('disabled', true);
                return;

            }

            let remainingGroups = this.currentList.all.filter( groupName => !walker.selected.includes( groupName ) ),
                nextItem = remainingGroups[ Math.floor(Math.random() * remainingGroups.length) ],
                nextGroupIndex = this.currentList.all.indexOf( nextItem );

            this.listEl.children().eq( nextGroupIndex ).addClass( 'list-group-item-success' );

            this.selected.push( nextItem );

            let itemWord = 'item' + ( this.selected.length === 1 ? '' : 's' );

            this.currentItemEl.text( nextItem );
            this.setStatusMessage( `${this.selected.length} ${itemWord} selected.` );

        }

    });

    this.listEl.on( 'keyup', '.list-group-item', function() {

        const inputEl = $(this);
        const itemIndex = inputEl.data( 'index' );

        walker.currentList.update( itemIndex, inputEl.val() );

    } );

    this.addItemButtonEl.on( 'click', this.addItem.bind( this ) );

    this.resetButtonEl.on( 'click', this.startList.bind( this ) );

    this.nextButtonEl.on('click', this.nextListItem.bind( this ) );

}

// Create the app
const walker = new RandomListWalker();

// Start the list walk through
walker.startList();