import {Item} from './item';
const elem = document.getElementById('output');
const aBook = new Item('はじめてのTypeScript', 2900);
aBook.say(elem);
aBook.greeter(elem, {
  firstName: 'Michael',
  lastName: 'Jackson'
});
