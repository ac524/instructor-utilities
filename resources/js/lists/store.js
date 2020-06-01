

class Store {

    constructor() {

        this.key = 'walker-lists';

        this.lists;

    }

    loadListsData() {

        return JSON.parse( localStorage.getItem( this.key ) || '{}' );

    }

    loadListData( listKey ) {

        return JSON.parse( localStorage.getItem( this.key ) || '{}' );

    }

    load() {

        const lists = JSON.parse( localStorage.getItem( storageName ) || '{}' );

        

        return this;

    }

}

export default Store;