import ListItemPicker from "../controllers/ListItemPicker";
import store from "../../store"
import api from "../../api";

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
                    saveAndClose:  async () => {
                        await this.save();
                        this.close();
                    }
                };

                if( actions[action] ) actions[action]();

            } )
            .on( 'show.bs.modal', ( { relatedTarget = false } ) => {

                const action = relatedTarget && relatedTarget.dataset.listAction;

                if( !action ) return

                const actions = {
                    editList:  () => this.setList( this.app.lists.currentList ),
                    newList: () => this.setData( { name: 'List '+ ( this.app.lists.count + 1 ) } )
                };

                if( actions[action] ) actions[action]();

                this.render();

            })
            // Clear the displayed data after the modal has closed.
            .on( 'hidden.bs.modal', (e) => this.resetData().render() )

    }

    async save() {

        const isNewList = !this.data.id;
        let refreshView = false;

        if( isNewList ) {

            refreshView = true;

            this.list = await api.createList( this.data );

            store.addList( this.list );
            // this.app.lists.addList( this.list );
            // this.app.lists.selectList( this.list.key );

        } else {

            const updated = this.list.update( this.data );

            if( updated ) {
                refreshView = true;
                await api.updateList( this.list.id, updated );
            }

        }

        if( refreshView ) {
            
            isNewList
                ? this.app.render()
                : this.app.listsControls.render();

        }

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
        this.setData( list );
        return this;
    }

    setData(data) {
        this.data = { ...data };
        return this;
    }

    render() {
        
        this.listNameInputEl.val( this.data.name );

        return this;

    }

}

export default ListModal;