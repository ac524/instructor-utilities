const storageName = 'walker-lists';

/**
 * Collection class for managing the entries and selection state for a target list.
 */
class ItemList {

    /**
     * ItemList class constructor
     * @param {string} key 
     * @param {string} name 
     */
    constructor( key, name = '' ) {

        const storageKey = key +'-'+ storageName;
        const selectStorageKey = key +'-selected-'+ storageName;

        // Load or create the target list
        let list = JSON.parse( localStorage.getItem( storageKey ) ) || [];
        let selectList = JSON.parse( localStorage.getItem( selectStorageKey ) ) || [];

        Object.defineProperty( this, 'all', {
            get: function() {
                return list;
            },
            set: function( value ) {
                list.length = 0;
                list.push( ...value );
            }
        } );
    
        Object.defineProperty( this, 'selected', {
            get: function() {
                return selectList;
            }
        } );

        /**
         * @returns {ItemList}
         */
        const save = () => {

            localStorage.setItem( storageKey, JSON.stringify( list ) );

            return this;

        }

        /**
         * @returns {ItemList}
         */
        const saveSelected = () => {

            localStorage.setItem( selectStorageKey, JSON.stringify( selectList ) );

            return this;

        }

        Object.assign( this, {
            name,
            save,
            saveSelected
        } )

    }

    get isComplete() {

        return this.all.length === this.selected.length;

    }

    get currentIndex() {

        return this.selected[ this.selected.length - 1 ] >= 0 ? this.selected[ this.selected.length - 1 ] : null;

    }

    get current() {

        return this.all[this.currentIndex] || null;

    }

    /**
     * @returns {ItemList}
     */
    resetSelected() {

        this.selected.length = 0;
        this.saveSelected();

        return this;

    }

    /**
     * @returns {ItemList}
     */
    selectRandom() {

        let unusedIndexes = this.all.map( ( groupName, i ) => i ).filter( ( i ) => !this.selected.includes( i ) );

        if( unusedIndexes.length ) {

            let nextItemIndex = unusedIndexes[ Math.floor(Math.random() * unusedIndexes.length) ];
    
            this.select( nextItemIndex );

        }

        return this;

    }

    /**
     * @param {number} targetIndex
     * @returns {ItemList}
     */
    select( targetIndex ) {

        if( !this.isSelected( targetIndex ) ) {
            
            this.selected.push( targetIndex );
            this.saveSelected();

        }


        return this;

    }

    /**
     * @param {number} targetIndex
     * @returns {ItemList}
     */
    unselect( targetIndex ) {

        const position = this.selected.indexOf( targetIndex );

        if( position > -1 ) {

            this.selected.splice( position, 1 );
            this.saveSelected();

        }


        return this;

    }

    /**
     * @param {number} index
     * @returns {boolean}
     */
    isSelected( index ) {

        return this.selected.includes( index );

    }
    
    /**
     * @param {number} index
     * @param {string} value
     * @returns {ItemList}
     */
    update( index, value ) {

        if( value !== this.all[index] ) {
            this.all[index] = value;
            this.save();
        }

        return this;

    }

    /**
     * @param {string} item
     * @returns {ItemList}
     */
    add( item ) {

        if( ! this.all.includes( item ) ) {

            this.all.push( item );
            this.save();

        }

        return this;

    }

    /**
     * @param {number} index
     * @returns {ItemList}
     */
    remove( index ) {

        this.all.splice( index, 1 );
        this.save();

        return this;

    }

}

/**
 * Collection class for managing defined lists.
 */
class ItemLists {

    /**
     * ItemLists class constructor.
     */
    constructor() {

        const deserialize = ( lists ) => Object.fromEntries( Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => [ key, new ItemList( key, name ) ] ) );
        const serialize = ( lists ) => JSON.stringify( Object.fromEntries(Object.entries( lists ).map( ([ key, value ]) => [ key, value.name ] )) );
    
        const lists = deserialize( localStorage.getItem( storageName ) || '{}' );

        Object.defineProperty( this, 'lists', {
            get: function() {
                return lists;
            }
        } );
    
        Object.defineProperty( this, 'all', {
            get: function() {
                return Object.entries( lists );
            }
        } );

        const save = () => {

            localStorage.setItem( storageName, serialize( lists ) );

            return this;

        }

        Object.assign( this, {
            save
        } );

    }

    /**
     * @param {number} index
     * @returns {ItemList}
     */
    getIndex( index ) {

        return this.all[index] ? this.all[index][1] : null;

    }

    /**
     * @param {string} key
     * @returns {ItemList}
     */
    get( key ) {

        return lists[key] || false;

    }

    /**
     * @param {string} name 
     * @returns {ItemList}
     */
    new( name = 'Default' ) {
            
        // Use the current time as a key
        const key = Date.now();

        const newList = new ItemList( key, name );

        this.lists[key] = newList;

        this.save();

        return newList;

    }

    /**
     * @param {string} key
     * @returns {ItemLists}
     */
    delete( key ) {

        delete this.lists[key];

        return this;

    }

}

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
                this.walker.startList();

            }

        }

        this.toggle();

    }

    isOpen() { return this.importExportEl.is(':visible') }

    toggle() { return this.importExportEl.toggle() }

}

class ListView {

    constructor() {

        this.el = $('#list-items');

    }

    /**
     * @param {ItemList} list 
     */
    render( list ) {

        this.el.empty();

        list.all
            .forEach( ( groupName, i ) => {

                console.log();

                const isSelected = list.isSelected(i);
                const isCurrent = i === list.currentIndex;
                
                let classModifiers = [];

                if( isCurrent ) classModifiers.push('list-group-item-success');
                else if( isSelected ) classModifiers.push('list-group-item-dark');

                const itemEl = $(
                    `<div class="input-group list-group-item col-12 col-sm-6 col-md-4 ${classModifiers.join(" ")}">
                        <input type="text" value="${groupName}" class="form-control item-label">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <input class="toggle-select" type="checkbox" aria-label="Checkbox for toggling an item's selection">
                            </div>
                            <button class="btn btn-outline-danger" data-action="remove">X</span>
                        </div>
                    </div>`
                );
                
                itemEl
                    // Set the data
                    .data( 'index', i )
                    // Navigate to the selected checkbox
                    .find( '.toggle-select' )
                    // Set the toggle state
                    .prop( 'checked', isSelected );

                this.el.append( itemEl );
        
            } );

        return this;
    }

}

/**
 * RandomListWalker class constructor
 */
class RandomListWalker {

    constructor() {

        this.lists = new ItemLists();
        this.currentList = this.lists.getIndex(0) || this.lists.new();
        this.importExport = new ListImportExport( this );
        this.view = new ListView();
        this.statusMessageEl = $('#status-message');
        this.currentItemEl = $('#current-name');
        this.nextButtonEl = $('#next-group');
        this.addItemButtonEl = $('#add-item');
        this.resetButtonEl = $('#reset-list');

        const saveOnInputChange = (e) =>  {

            const inputEl = $(e.target);
            const itemIndex = inputEl.closest('.input-group').data( 'index' );

            this.currentList.update( itemIndex, inputEl.val() );

        }

        const onToggleSelect = (e) => {

            const checkboxEl = $(e.target);
            const itemIndex = checkboxEl.closest('.input-group').data( 'index' );

            this.currentList.isSelected( itemIndex )

                ? this.currentList.unselect( itemIndex )

                : this.currentList.select( itemIndex );

            this.render();

        }

        const onButtonAction = (e) => {

            const buttonEl = $(e.target);
            const itemIndex = buttonEl.closest('.input-group').data( 'index' );
            const action = buttonEl.data( 'action' );

            if( action === 'remove' ) {

                this.currentList.remove( itemIndex );
                this.restartList();

            }

        }

        this.view.el
            .on( 'keyup', '.item-label', saveOnInputChange )
            .on( 'change', '.toggle-select', onToggleSelect )
            .on( 'click', '[data-action]', onButtonAction );

        this.addItemButtonEl.on( 'click', this.addItem.bind( this ) );

        this.resetButtonEl.on( 'click', this.restartList.bind( this ) );

        this.nextButtonEl.on('click', this.nextListItem.bind( this ) );
        
    }

    setStatusMessage( message, status = 'info' ) {

        let previousStatus = this.statusMessageEl.data( 'status' );

        if( previousStatus && previousStatus !== status ) 
    
            // Remove the previous status class
            this.statusMessageEl.removeClass( 'alert-'+ previousStatus );
    
        this.statusMessageEl
            .data( 'status', status )
            .addClass( 'alert-'+ status )
            .text( message );

    }

    displayListStatus() {

        if( this.currentList.isComplete ) {
            
            this.currentItemEl.text( this.currentList.current );
            this.setStatusMessage( 'List Complete', 'success' );
            this.nextButtonEl.prop('disabled', true);

        } else {

            let itemWord = 'item' + ( this.currentList.selected.length === 1 ? '' : 's' );

            this.setStatusMessage( `${this.currentList.selected.length} ${itemWord} selected.` );
            
            if( this.currentList.selected.length ) {
                
                this.currentItemEl.text( this.currentList.current );

            } else {
                
                this.currentItemEl.text( 'No Selection' );

            }
            
        }

    }

    addItem() {

        this.currentList.add( 'Item '+ (this.currentList.all.length + 1) );

        this.restartList();

    }

    startList() {

        this.render();

    }


    restartList() {

        this.currentList.resetSelected();
        this.nextButtonEl.prop('disabled', false);

        this.startList();

    }

    nextListItem() {

        if( this.currentList.isComplete )

            // Exit early if the list is already done. Nothing to do here!
            return this;

        this.currentList.selectRandom();

        this.render();

        return this;

    }

    render() {

        this.view.render( this.currentList );

        this.displayListStatus();

    }

}

// Create the app
const walker = new RandomListWalker();

// Start the list walk through
walker.startList();