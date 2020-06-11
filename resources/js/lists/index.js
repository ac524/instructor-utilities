import ListItemPicker from "./controllers/ListItemPicker";

import '../../css/style.css';

// Create the app
const itemPicker = new ListItemPicker();

if( !itemPicker.lists.count ) itemPicker.lists.createList();

// Start the list walk through
itemPicker.render();