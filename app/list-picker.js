const selections = [
        'Group 1',
        'Group 2',
        'Group 3',
        'Group 4'
    ],
    selected = [],
    groupListEl = $('#all-groups'),
    resetButtonEl = $('#reset-list'),
    nextButtonEl = $('#next-group'),
    statusMessageEl = $('#status-message');

const setStatusMessage = ( message, status = 'info' ) => {

    let previousStatus = statusMessageEl.data( 'status' );

    if( previousStatus && previousStatus !== status ) 

        // Remove the previous status class
        statusMessageEl.removeClass( 'alert-'+ previousStatus );

    statusMessageEl
        .data( 'status', status )
        .addClass( 'alert-'+ status )
        .text( message );

};

const displayItems = () => {

    groupListEl.empty();

    selections
        .forEach( groupName => {

        groupListEl.append(
            `<li class="list-group-item">${groupName}</li>`
        );

    } );

};

const startList = () => {

    selected.length = 0;
    nextButtonEl.prop('disabled', false);
    setStatusMessage( selected.length + ' groups called on.' );
    displayItems();

};

resetButtonEl.on( 'click', startList );

nextButtonEl.on('click', () => {

    groupListEl
        .children( '.list-group-item-success' )
        .removeClass( 'list-group-item-success' )
        .addClass( 'list-group-item-dark' );

    if( selections.length === selected.length ) {

        setStatusMessage( 'Presentations Complete', 'success' );

        nextButtonEl.prop('disabled', true);
        return;

    }

    let remainingGroups = selections.filter( groupName => !selected.includes( groupName ) ),
        nextGroup = remainingGroups[ Math.floor(Math.random() * remainingGroups.length) ],
        nextGroupIndex = selections.indexOf( nextGroup );

    groupListEl.children().eq( nextGroupIndex ).addClass( 'list-group-item-success' );

    selected.push( nextGroup );

    let groupWord = 'group' + ( selected.length === 1 ? '' : 's' );

    setStatusMessage( `${selected.length} ${groupWord} called on.` );

});

startList();