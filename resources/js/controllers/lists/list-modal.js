class ListModal {

    constructor() {

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