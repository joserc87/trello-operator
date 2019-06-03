import css from '../css/main.css'
import $ from 'jquery';
import {
  CardCollapseButton,
  PluginButton
} from './components/buttons'
import {TrelloChangeListener} from './utils/trello/listener'
import {
  expandStory,
  collapseStory,
  setCardsExpanded,
} from './utils/trello/ui'

// Globals
let byteString,
  xlsx,
  ArrayBuffer,
  Uint8Array,
  Blob,
  saveAs;

/**
 * Adds the plugin buttons to the page
 */
function addButtons() {
  const collapseButton = new CardCollapseButton()
  collapseButton.mount()

  const pluginButton = new PluginButton()
  pluginButton.mount()
}


/**
 * UNUSED FUNCTIONALITY
 * REMOVE
 */
function addEventListeners() {
  $('.card-label').dblclick(function(e) {
    //alert('double click!');
    e.stopPropagation();
    e.preventDefault();

    // Story title
    var title = e.target.title;

    // Check if it's collapsed or expanded
    var el = $(e.target);
    var collapsed = el.parent().parent().parent().hasClass('collapsed');

    if (collapsed) {
      getCardsByTitle(title).removeClass('collapsed');
      expandStory(title);
    } else {
      getCardsByTitle(title).addClass('collapsed');
      collapseStory(title);
    }
    e.stopPropagation();
  });
}

/**
 * Given a title, find all the cards that contain a label with that title
 */
function getCardsByTitle(title) {
  function filterByTitle(index, element) {
    return title === undefined || element.title === title;
  }

  if (title !== undefined) {
    return $('.card-label').filter(filterByTitle).parent().parent().parent();
  } else {
    return $('.card-label').filter(filterByTitle).parent().parent().parent();
  }
}


function listen() {
  const onTrelloChange = new TrelloChangeListener(
    500, applyExtension)
}

function applyExtension() {
  addEventListeners();
  addButtons();
}

// on DOM load
$(function () {
  "use strict";
  const addInterval = setTimeout(() => {
    listen()
    applyExtension()
  }, 500);
});
