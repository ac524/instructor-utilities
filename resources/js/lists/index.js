import ListItemPicker from "./controllers/ListItemPicker";

import '../../css/style.css';

// Create the app
const itemPicker = new ListItemPicker();

itemPicker.init();

// Create and save a starting 'Default' list if we don't have any.
// if( !itemPicker.lists.count ) {
//     itemPicker.lists.createList();
//     itemPicker.lists.save();
// }

// const firstList = itemPicker.lists.getByIndex(0);
// itemPicker.selectList( firstList.key );

// // Start the list walk through
// itemPicker.render();