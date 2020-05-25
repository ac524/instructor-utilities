import ListStatus from './list-status';
import Lists from '../../models/lists/lists';

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
     * @param {List} list 
     */
    render( list ) {

        this.enabledEl.empty();
        this.disabledEl.empty();

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
     * @param {Lists} lists 
     * @param {string} currentKey
     */
    displayListOptions( lists ) {

        this.listOptionsEl.empty();

        lists.all.forEach( ([key, list]) => {
            this.listOptionsEl.append(
                $(`<option value="${key}">${list.name}</option>`).prop('selected', list.isCurrent )
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
     * @param {List} list 
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

export default ListView;