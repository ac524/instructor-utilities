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

export default ListControls;