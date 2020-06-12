import ListItemPicker from '../controllers/ListItemPicker';

class ListModal {

    /**
     * @param {ListItemPicker} listPicker 
     */
    constructor( listPicker ) {

        this.app = listPicker;

        // Modal
        this.el = $('#edit-list-modal');

        // Inputs
        this.listNameInputEl = $('#list-name-input');

        /** @type {List} */
        this.list;

        this.data;

        this.resetData();

        const updateDataOnChange = ( { target: { name, value } }) => this.data[name] = value;

        this.el
            .on( 'keyup', updateDataOnChange )
            .on( 'click', '[data-modal-action]', ( { currentTarget = false } ) => {

                const action = currentTarget && currentTarget.dataset.modalAction;

                if( !action ) return;

                const actions = {
                    saveAndClose:  () => {
                        this.save().close();
                    }
                };

                if( actions[action] ) actions[action]();

            } )
            .on( 'show.bs.modal', ( { relatedTarget = false } ) => {

                const action = relatedTarget && relatedTarget.dataset.listAction;

                if( !action ) return

                const actions = {
                    editList:  () => this.setList( this.app.lists.currentList ),
                    newList: () => this.setList( this.app.newList() )
                };

                if( actions[action] ) actions[action]();

                this.render();

            })
            // Clear the displayed data after the modal has closed.
            .on( 'hidden.bs.modal', (e) => this.resetData().render() )

    }

    save() {
        const updated = this.list.update( this.data );

        if( updated ) {
            this.app.lists.save();
            this.app.listsControls.render();
        }
        
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
     * @param {List} list
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

export default ListModal;