import ListItemPicker from "../ListItemPicker";
import CurrentItem from "./CurrentItem";
import ListControls from "./ListControls";

/**
 * @param {ListItem} item 
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

class ListView {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        // List Containers
        this.enabledEl = $('#list-enabled-items');
        this.disabledEl = $('#list-disabled-items');

        this.currentItem = new CurrentItem( this.app );

        this.controls = new ListControls( this.app );

    }

    /**
     * @returns {List}
     */
    get currentList() {
        return this.app.lists.currentList;
    }

    render() {

        this.enabledEl.empty();
        this.disabledEl.empty();

        this.currentList.enabled.forEach( ( item ) => this.enabledEl.append( createItem( item ) ) );
        this.currentList.disabled.forEach( ( item ) => this.disabledEl.append( createItem( item ) ) );

        this.displayStatus();
        this.currentItem.render();
        this.controls.render();

        // this
        //     .displayStatus( list )
        //     .manageControls( list )
        //     .displayCurrentItem( list );

        return this;

    }

    /**
     * @return {ListView}
     */
    displayStatus() {

        if( this.currentList.isComplete ) {
            
            this.app.status.set( 'List Complete', 'success' );

        } else {

            let itemWord = 'item' + ( this.currentList.enabled.length === 1 ? '' : 's' );
            this.app.status.set( `${this.currentList.selected.length} out of ${this.currentList.enabled.length} ${itemWord} selected.` );
            
        }

        return this;

    }

}

export default ListView;