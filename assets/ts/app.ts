import {Item} from './item';
const elem = document.getElementById('output');
const aBook = new Item('はじめてのTypeScript', 3980);
aBook.say(elem);
