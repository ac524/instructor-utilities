import List from "../models/List";
import ListItemPicker from "../controllers/ListItemPicker";
import store from "../../store";
import api from "../../api";

class ListControls {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        // Container for all list items
        this.itemsEl = $('#list-items');
        
        // List Selection Buttons
        this.prevButtonEl = $('#prev-item');
        this.nextButtonEl = $('#next-item');
        this.resetButtonEl = $('#reset-list');

        // List Management Buttons
        this.addItemButtonEl = $('#add-item');
        this.disableItemButtonEl = $('#disable-current-item');

        this.itemsEl
            .on( 'keyup', '.item-label', this.onInputChange.bind( this ) )
            .on( 'change', '.toggle-select', this.onToggleSelect.bind( this ) )
            .on( 'click', '[data-action]', this.onButtonAction.bind( this ) );

        this.addItemButtonEl.on( 'click', () => this.addListItem( 'Item '+ (this.currentList.all.length + 1) ) );

        this.resetButtonEl.on( 'click', this.restartList.bind( this ) );

        this.prevButtonEl.on( 'click', this.previousListItem.bind( this ) );
        this.nextButtonEl.on( 'click', this.nextListItem.bind( this ) );

        this.disableItemButtonEl.on('click', this.disableCurrentListItem.bind( this ));

    }

    /**
     * @returns {List}
     */
    get currentList() {
        return store.lists.currentList;
    }

    /**
     * Event handler for saving list items after the input for the label has been updated
     * @param {*} param0 
     */
    async onInputChange( { target } ) {

        const inputEl = $(target);
        const itemIndex = inputEl.closest('.input-group').data( 'index' );
        const item = this.currentList.all[itemIndex];

        const updated = item.update( { name: inputEl.val() } );

        if( updated ) await api.updateListItem( item.id, updated );

    }

    /**
     * Event handler for toggling the item's selection checkbox
     * @param {*} param0 
     */
    async onToggleSelect( { target } ) {

        const checkboxEl = $(target);
        const itemIndex = checkboxEl.closest('.input-group').data( 'index' );
        const listItem = this.currentList.all[itemIndex];

        
        if( this.currentList.isItemSelected( listItem.id ) ) {

            this.currentList.unselectItem( listItem.id );
            await api.unselectListItem( listItem.ListId, listItem.id );

        } else {

            this.currentList.selectItem( listItem.id );
            await api.selectListItem( listItem.ListId, listItem.id );

        }

        // this.currentList.saveSelected();
            
        this.app.view.render();

    }

    /**
     * Event handler for item button clicks.
     * @param {*} param0 
     */
    onButtonAction( { currentTarget } ) {

        const buttonEl = $(currentTarget);
        const action = buttonEl.data( 'action' );

        if( !action ) return;

        const itemIndex = buttonEl.closest('.input-group').data( 'index' );
        const listItem = this.currentList.all[itemIndex];

        const actions = {
            remove: () => this.deleteListItem( listItem.id ),
            disable: () => this.disableListItem( listItem.id )
        }

        if( actions[action] ) actions[action]();

    }


    /**
     * @param {string} name 
     * @returns {ListControls}
     */
    async addListItem( name ) {

        const item = await api.createListItem( this.currentList.id, { name } );

        store.addListItem( this.currentList.id, item );

        // this.currentList.createItem( name );

        // this.currentList
        //     .emptySelected()
        //     .saveListContent();

        this.app.view.render();

        return this;

    }

    /**
     * @param {index} itemId
     */
    async deleteListItem( itemId ) {

        this.currentList.removeItem( itemId ).emptySelected();

        await api.deleteListItem( itemId );

        this.app.view.render();

    }

    /**
     * @param {index} itemId 
     * @returns {ListControls}
     */
    async disableListItem( itemId ) {

        const item = this.currentList.getItem(itemId);
        const wasSelected = item.isSelected;

        const isDisabled = item.toggleDisable();

        isDisabled
            ? await api.disableListItem( item.ListId, item.id )
            : await api.enableListItem( item.ListId, item.id );

        if( wasSelected ) {
            await api.unselectListItem( item.ListId, item.id );
        }

        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    disableCurrentListItem() {
         
        if ( this.currentList.selected.length ) 
        
            this.disableListItem( this.currentList.currentItemId );

        return this;

    }

    /**
     * @returns {ListControls}
     */
    async previousListItem() {

        if( !this.currentList.selected.length )

            // Exit early if there are no selected items to undo.
            return this;

        const currentItemId = this.currentList.currentItemId;

        this.currentList.unselectItem( currentItemId );
        await api.unselectListItem( this.currentList.id, currentItemId );

        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    async nextListItem() {

        if( this.currentList.isComplete ) {
            
            this.currentList.emptySelected();
            await api.clearSelectedListItems( this.currentList.id );

        }


        this.currentList.selectRandomItem();

        await api.selectListItem( this.currentList.id, this.currentList.currentItem.id );

        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    async restartList() {

        this.currentList.emptySelected();
        await api.clearSelectedListItems( this.currentList.id );
        
        this.app.view.render();

        return this;

    }

    /**
     * @returns {ListControls}
     */
    render() {
      
        this.prevButtonEl.prop( 'disabled', !this.currentList.selected.length );
        this.nextButtonEl.text( this.currentList.isComplete ? 'Restart' : 'Next' );

        this.disableItemButtonEl.prop( 'disabled', !this.currentList.selected.length );

        return this;

    }

}

export default ListControls;