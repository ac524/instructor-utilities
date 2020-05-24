const storageName = 'walker-lists';

class Item {

    /**
     * @param {string} label 
     * @param {boolean} isDisabled
     * @param {ItemList} list
     */
    constructor( { label, isDisabled = false }, list ) {

        this.label = label;
        this.isDisabled = isDisabled;

        Object.defineProperty( this, 'belongsTo', {
            get: () => list
        } );

    }

    /**
     * The item's position in the list it belongs to.
     * @returns {number}
     */
    get index() {
        return this.belongsTo.all.indexOf( this );
    }

    /**
     * Flag for if this item's index exists in the list it belongs to.
     * @returns {boolean}
     */
    get isSelected() {
        return this.belongsTo.isSelected( this.index );
    }

    /**
     * Flag for if this item's index is the last item selected.
     * @returns {boolean}
     */
    get isCurrent() {
        return this.index === this.belongsTo.currentIndex;
    }

    /**
     * @param {string} label
     * @returns {Item}
     */
    update( { label } ) {

        if( label !== this.label ) {
            this.label = label;
            this.belongsTo.save();
        }

        return this;

    }

    /**
     * Modifies the item's disabled state and updates it's state in the list it belongs to.
     * @returns {Item}
     */
    toggleDisable() {

        this.isDisabled = !this.isDisabled;

        if( this.isDisabled && this.isSelected )

            this.belongsTo.unselect( this.index );

        this.belongsTo.save();

        return this;

    }

}

/**
 * Collection class for managing the entries and selection state for a target list.
 */
class ItemList {

    /**
     * ItemList class constructor
     * @param {string} key 
     * @param {string} name 
     */
    constructor( key, name = '', collection ) {

        this.name = name;

        const storageKey = key +'-'+ storageName;
        const selectStorageKey = key +'-selected-'+ storageName;

        // Load or create the target list
        let list = JSON.parse( localStorage.getItem( storageKey ) ) || [];
        let selectList = JSON.parse( localStorage.getItem( selectStorageKey ) ) || [];

        // Migrate old data format if needed
        if( list[0] && typeof list[0] === 'string' )

            list = list.map( label => ({ label }) );

        list = list.map( item => new Item( item, this ) );

        Object.defineProperty( this, 'all', {
            get: () => list,
            set: function( value ) {
                list.length = 0;
                list.push( ...value );
            }
        } );
    
        Object.defineProperty( this, 'selected', { get: () => selectList } );
        Object.defineProperty( this, 'key', { get: () => key } );
        Object.defineProperty( this, 'storageKey', { get: () => storageKey } );
        Object.defineProperty( this, 'selectStorageKey', { get: () => selectStorageKey } );
        Object.defineProperty( this, 'belongsTo', { get: () => collection } );

    }

    get enabled() {

        return this.all.filter( item => !item.isDisabled );

    }

    get disabled() {

        return this.all.filter( item => item.isDisabled );

    }

    get isComplete() {

        return this.enabled.length && this.enabled.length === this.selected.length;

    }

    get currentIndex() {

        return this.selected[ this.selected.length - 1 ] >= 0 ? this.selected[ this.selected.length - 1 ] : null;

    }

    /**
     * @returns {Item}
     */
    get current() {

        return this.all[this.currentIndex] || null;

    }

    update( { name } ) {

        this.name = name;

        this.belongsTo.save();

        return this;

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

        let unusedIndexes = this.enabled.map( ( { index } ) => index ).filter( ( i ) => !this.selected.includes( i ) );

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
     * @param {Item} item 
     */
    indexOf( item ) {

        return this.all.indexOf( item );

    }

    /**
     * @param {string} item
     * @returns {ItemList}
     */
    add( label ) {

        this.all.push( new Item( { label }, this ) );
        this.save();

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


    /**
     * @returns {ItemList}
     */
    save() {

        localStorage.setItem( this.storageKey, JSON.stringify( this.all ) );

        return this;

    }

    /**
     * @returns {ItemList}
     */
    saveSelected() {

        localStorage.setItem( this.selectStorageKey, JSON.stringify( this.selected ) );

        return this;

    }

    copy() {
        return new ItemList( this.key, this.name, this.belongsTo );
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

        const deserialize = ( lists ) => Object.fromEntries( Object.entries( JSON.parse( lists ) ).map( ([ key, name ]) => [ key, new ItemList( key, name, this ) ] ) );
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

        Object.defineProperty( this, 'save', {
            value: () => {

                localStorage.setItem( storageName, serialize( lists ) );
    
                return this;
    
            },
            writable: false
        } )

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

        return this.lists[key] || false;

    }

    /**
     * @param {string} name 
     * @returns {ItemList}
     */
    new( name = 'Default' ) {
            
        // Use the current time as a key
        const key = Date.now().toString();

        const newList = new ItemList( key, name, this );

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

        this.save();

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
                this.walker.render();

            }

        }

        this.toggle();

    }

    isOpen() { return this.importExportEl.is(':visible') }

    toggle() { return this.importExportEl.toggle() }

}

class ListModal {

    constructor() {

        // Modal
        this.el = $('#edit-list-modal');

        // Inputs
        this.listNameInputEl = $('#list-name-input');

        /** @type {ItemList} */
        this.list;

        this.data;

        this.resetData();

        const updateDataOnChange = ( { target: { name, value } }) => this.data[name] = value;

        this.el
            .on( 'keyup', updateDataOnChange )
            .on( 'click', '[data-modal-action]', ( { currentTarget } ) => {

                const action = currentTarget.dataset.modalAction;

                const actions = {
                    saveAndClose:  () => {
                        this.save().close();
                    }
                };

                if( action && actions[action] ) actions[action]();

            } )
            .on( 'show.bs.modal', (e) => this.render() )
            // Clear the displayed data after the modal has closed.
            .on( 'hidden.bs.modal', (e) => this.resetData().render() );

    }

    save() {
        this.list.update( this.data );
        return this;
    }

    close() {
        this.el.modal('hide');
        return this;
    }

    resetData() {
        this.list = null;
        this.data = { name: '' };
        return this;
    }

    /**
     * @param {ItemList} list
     */
    setList( list ) {
        this.list = list;
        this.data = { ...list };
        return this;
    }

    render() {
        
        this.listNameInputEl.val( this.data.name );

        return this;

    }

}

class ListControls {

    /**
     * @param {RandomListWalker} walker 
     */
    constructor( walker ) {
        
        this.view = walker.view;
        this.lists = walker.lists;
        this.selectList = walker.selectList.bind(walker);
        this.render = walker.render.bind(walker);

        Object.defineProperty( this, 'currentList', {
            get() {
                return walker.currentList
            }
        } );

        this.view.el
            .on( 'keyup', '.item-label', this.saveOnInputChange.bind( this ) )
            .on( 'change', '.toggle-select', this.onToggleSelect.bind( this ) )
            .on( 'click', '[data-action]', this.onButtonAction.bind( this ) );

        this.view.addItemButtonEl.on( 'click', this.addItem.bind( this ) );

        this.view.resetButtonEl.on( 'click', this.restartList.bind( this ) );

        this.view.nextButtonEl.on( 'click', this.nextListItem.bind( this ) );

        this.view.listOptionsEl.on( 'change', ( { currentTarget: { value } } ) => this.selectList( this.lists.get( value ) ) );

        this.view.deleteListButtonEl.on( 'click', () => {
            this.lists.delete( this.currentList.key );
            this.selectList( this.lists.getIndex( 0 ) );
            this.view.displayListOptions( this.lists, this.currentList.key );
         } );

    }

    /**
     * @param {ListModal} modal 
     */
    setupModal( modal ) {

        modal.el
            .on( 'show.bs.modal', (e) => {

                const actions = {
                    editList:  () => modal.setList( this.currentList ).render(),
                    newList: () => {
                        const newList = this.lists.new( 'List '+ ( this.lists.all.length + 1 ) );
                        modal.setList( newList ).render();
                        this.selectList( newList );
                        this.view.displayListOptions( this.lists, this.currentList.key );
                    }
                };

                const action = e.relatedTarget.dataset.listAction;

                if( action && actions[action] ) actions[action]();

            } )
            .on( 'hide.bs.modal', (e) => this.view.displayListOptions( this.lists, this.currentList.key ).displayListName( this.currentList ) );

    }

    saveOnInputChange(e) {

        const inputEl = $(e.target);
        const itemIndex = inputEl.closest('.input-group').data( 'index' );

        this.currentList.all[itemIndex].update( { label: inputEl.val() } );

    }

    onToggleSelect(e) {

        const checkboxEl = $(e.target);
        const itemIndex = checkboxEl.closest('.input-group').data( 'index' );

        this.currentList.isSelected( itemIndex )

            ? this.currentList.unselect( itemIndex )

            : this.currentList.select( itemIndex );

        this.render();

    }

    onButtonAction(e) {

        const buttonEl = $(e.currentTarget);
        const itemIndex = buttonEl.closest('.input-group').data( 'index' );
        const action = buttonEl.data( 'action' );

        if( action === 'remove' ) {

            this.currentList.remove( itemIndex );
            this.restartList();

        } else if( action === 'disable' ) {

            this.currentList.all[itemIndex].toggleDisable();
            this.render();

        }

    }

    addItem() {

        this.currentList.add( 'Item '+ (this.currentList.all.length + 1) );

        this.restartList();

    }

    nextListItem() {

        if( this.currentList.isComplete )

            // Exit early if the list is already done. Nothing to do here!
            return this;

        this.currentList.selectRandom();

        this.render();

        return this;

    }


    restartList() {

        this.currentList.resetSelected();

        this.render();

    }

}

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

class ListView {

    constructor() {

        this.el = $('#list-items');

        // List Containers
        this.enabledEl = $('#list-enabled-items');
        this.disabledEl = $('#list-disabled-items');

        // List Selection Buttons
        this.nextButtonEl = $('#next-group');
        this.resetButtonEl = $('#reset-list');

        // List Management Buttons
        this.addItemButtonEl = $('#add-item');

        // Current List Display
        this.currentTitleEl = $('#current-list-title');

        // Current List Selection Display
        this.currentItemEl = $('#current-name');

        // Available Lists
        this.listOptionsEl = $('#list-options');

        // List Collection Controls
        this.newListButtonEl = $('#new-list');
        this.deleteListButtonEl = $('#delete-list');

        this.status = new ListStatus();

    }

    /**
     * @param {ItemList} list 
     */
    render( list ) {

        this.enabledEl.empty();
        this.disabledEl.empty();

        /**
         * @param {Item} item 
         */
        const createItem = ( item ) => {
            
            const classModifiers = [];
            const disableIcon = item.isDisabled ? 'fa-eye-slash' : 'fa-eye';

            if( item.isCurrent ) classModifiers.push('list-group-item-success');
            else if( item.isSelected ) classModifiers.push('list-group-item-dark');

            const itemEl = $(
                `<div class="input-group list-group-item col-12 col-sm-6 col-md-4 ${classModifiers.join(" ")}">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input class="toggle-select" type="checkbox" aria-label="Checkbox for toggling an item's selection">
                        </div>
                    </div>
                    <input type="text" value="${item.label}" class="form-control item-label">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" data-action="disable">
                            <i class="fas ${disableIcon}"></i>
                        </button>
                        <button class="btn btn-outline-danger" data-action="remove">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                </div>`
            );
            
            itemEl
                // Set the data
                .data( 'index', item.index )
                // Navigate to the selected checkbox
                .find( '.toggle-select' )
                // Set the toggle state
                .prop( 'checked', item.isSelected );

            return itemEl;

        }

        list.enabled.forEach( ( item ) => this.enabledEl.append( createItem( item ) ) );
        list.disabled.forEach( ( item ) => this.disabledEl.append( createItem( item ) ) );

        this
            .displayStatus( list )
            .manageControls( list )
            .displayCurrentItem( list );

        return this;

    }

    manageControls( list ) {

        list.isComplete

            ? this.nextButtonEl.prop('disabled', true)

            : this.nextButtonEl.prop('disabled', false);


        return this;

    }

    /**
     * @param {ItemLists} lists 
     * @param {string} currentKey
     */
    displayListOptions( lists, currentKey ) {

        console.log( lists, currentKey );

        this.listOptionsEl.empty();

        lists.all.forEach( ([key, list]) => {
            this.listOptionsEl.append(
                $(`<option value="${key}">${list.name}</option>`).prop('selected', currentKey === key)
            );
        });

        return this;

    }

    displayListName( list ) {

        this.currentTitleEl.text( list.name );

        return this;

    }

    displayCurrentItem( list ) {

        if( list.isComplete ) {

            this.currentItemEl.text( list.current.label );

        } else {

            list.selected.length
                
                ? this.currentItemEl.text( list.current.label )

                : this.currentItemEl.text( 'No Selection' );

        }

        return this;

    }

    /**
     * @param {ItemList} list 
     */
    displayStatus( list ) {

        if( list.isComplete ) {
            
            this.status.set( 'List Complete', 'success' );

        } else {

            let itemWord = 'item' + ( list.enabled.length === 1 ? '' : 's' );
            this.status.set( `${list.selected.length} out of ${list.enabled.length} ${itemWord} selected.` );
            
        }

        return this;

    }

}

/**
 * RandomListWalker class constructor
 */
class RandomListWalker {

    constructor() {

        this.lists = new ItemLists();
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
     * @param {ItemList} list 
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