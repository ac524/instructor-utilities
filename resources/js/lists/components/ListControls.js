import List from "../models/list";
import ListItemPicker from "../controllers/ListItemPicker";

class ListControls {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        this.itemsEl = $('#list-items');

        // List Selection Buttons
        this.nextButtonEl = $('#next-group');
        this.resetButtonEl = $('#reset-list');

        // List Management Buttons
        this.addItemButtonEl = $('#add-item');

        this.itemsEl
            .on( 'keyup', '.item-label', this.saveOnInputChange.bind( this ) )
            .on( 'change', '.toggle-select', this.onToggleSelect.bind( this ) )
            .on( 'click', '[data-action]', this.onButtonAction.bind( this ) );

        this.addItemButtonEl.on( 'click', () => this.addListItem( 'Item '+ (this.currentList.all.length + 1) ) );

        this.resetButtonEl.on( 'click', this.restartList.bind( this ) );

        this.nextButtonEl.on( 'click', this.nextListItem.bind( this ) );

    }

    /**
     * @returns {List}
     */
    get currentList() {
        return this.app.lists.currentList;
    }

    saveOnInputChange(e) {

        const inputEl = $(e.target);
        const itemIndex = inputEl.closest('.input-group').data( 'index' );

        this.currentList.updateItem( itemIndex, { label: inputEl.val() } );

    }

    onToggleSelect(e) {

        const checkboxEl = $(e.target);
        const itemIndex = checkboxEl.closest('.input-group').data( 'index' );

        this.currentList.isSelected( itemIndex )

            ? this.currentList.unselect( itemIndex )

            : this.currentList.select( itemIndex );
            
        this.app.view.render();

    }

    onButtonAction(  { currentTarget } ) {

        const buttonEl = $(currentTarget);
        const action = buttonEl.data( 'action' );

        if( !action ) return;

        const itemIndex = buttonEl.closest('.input-group').data( 'index' );

        const actions = {
            remove: () => this.deleteListItem( itemIndex ),
            disable: () => this.disableListItem( itemIndex )
        }

        if( actions[action] ) actions[action]();

    }


    /**
     * @param {string} label 
     * @returns {ListControls}
     */
    addListItem( label ) {

        this.currentList.add( label ).resetSelected();
        this.app.view.render();

        return this;

    }

    /**
     * @param {index} itemIndex
     * @returns {ListControls}
     */
    deleteListItem( itemIndex ) {

        this.currentList.remove( itemIndex ).resetSelected();

        this.app.view.render();

        return this;

    }

    /**
     * @param {index} itemIndex 
     * @returns {ListControls}
     */
    disableListItem( itemIndex ) {

        this.currentList.all[itemIndex].toggleDisable();

        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    nextListItem() {

        if( this.currentList.isComplete )

            // Exit early if the list is already done. Nothing to do here!
            return this;

        this.currentList.selectRandom();

        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    restartList() {

        this.currentList.resetSelected();
        
        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    render() {

        this.nextButtonEl.prop( 'disabled', this.currentList.isComplete );

        return this;

    }

}

export default ListControls;