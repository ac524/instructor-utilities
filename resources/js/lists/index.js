import ListItemPicker from "./controllers/ListItemPicker";

import '../../css/style.css';

// Create the app
const itemPicker = new ListItemPicker();

// Create and save a starting 'Default' list if we don't have any.
if( !itemPicker.lists.count ) {
    itemPicker.lists.createList();
    itemPicker.lists.save();
}

const firstList = itemPicker.lists.getIndex(0);
itemPicker.selectList( firstList.key );

// Start the list walk through
itemPicker.render();