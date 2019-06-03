import css from '../css/main.css'
import $ from 'jquery';
import observeDOM from './observeDOM'
import {CardCollapseButton} from './CardCollapseButton'

// Globals
let byteString,
  xlsx,
  ArrayBuffer,
  Uint8Array,
  Blob,
  saveAs;

// BUTTON

function createPluginButton() {
  var container = $('<span/>', {
    class: 'board-header-btn trello-operator-header-btn'
  });

  var icon = $('<span/>', {
    class: 'board-header-btn-icon icon-sm plugin-icon recolorable trello-operator-icon',
  });

  var collapseButton = $('<span/>', {
    class: 'board-header-btn-text u-text-underline',
    text: "-><-",
    click: collapseEverything,
  });

  var expandButton = $('<span/>', {
    class: 'board-header-btn-text u-text-underline',
    text: "<-->",
    click: expandEverything,
  });

  container.append(icon);
  container.append(collapseButton);
  container.append(expandButton);
  return container;
}

/**
 * Adds the plugin buttons to the page
 */
function addButtons() {
  const collapseButton = new CardCollapseButton()
  collapseButton.mount()

  var pluginButton = createPluginButton();
  $('.board-header:not(:has(.trello-operator-header-btn))').append(pluginButton);
}


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

function expandStory(title) {
  console.log('Expanding story "' + title + '"');
  var cards = getCardsByTitle(title);
  setCardsExpanded(cards, true);
}

function collapseStory(title) {
  console.log('Collapsing story "' + title + '"');
  var cards = getCardsByTitle(title);
  setCardsExpanded(cards, false);
}

function expandCard(card) {
  console.log('Expanding card');
  setCardsExpanded(card, true);
}

function collapseCard(card) {
  console.log('Collapsing card');
  setCardsExpanded(card, false);
}

/**
 * Sets a card as collapsed or expanded 
 * @param cards The list of cards, retrieved by jQuery
 * @param expanded boolean. True to expand, false to collapse
 */
function setCardsExpanded(cards, expanded) {
  var display = expanded ? 'unset' : 'none';

  cards.find('.list-card-title').css('display', display);
  cards.find('.badges').css('display', display);
  cards.find('.sticker').css('display', display);
  if (expanded) {
    cards.find('.list-card-details').removeClass('collapsed');
  } else {
    cards.find('.list-card-details').addClass('collapsed');
  }
  cards.find('.list-card-members').css('display', display);
}

function expandEverything() {
  $('.collapse-button').removeClass('icon-down').addClass('icon-up');
  $('.list-card').removeClass('collapsed');

  $('.list-card-title').css('display', 'unset');
  $('.badges').css('display', 'unset');
  $('.sticker').css('display', 'unset');
  $('.list-card-details').removeClass('collapsed');
  $('.list-card-members').css('display', 'unset');
}

function collapseEverything() {
  $('.collapse-button').removeClass('icon-up').addClass('icon-down');
  $('.list-card').addClass('collapsed');

  $('.list-card-title').css('display', 'none');
  $('.badges').css('display', 'none');
  $('.sticker').css('display', 'none');
  $('.list-card-details').addClass('collapsed');
  $('.list-card-members').css('display', 'none');
}

function applyExtension() {
  //collapse()
  addEventListeners();
  addButtons();
  watchForChangingBoard();
}

var waiting = false;

function handleSurfaceChangedDelayed() {
  console.log('Surface changed! Re-applying extension');
  applyExtension()
  waiting = false;
}

function handleSurfaceChanged() {
  // This handler will be called many many times
  // On every time the handler is called, we should timeout a callback
  // that will add the button to the toolbar if not present, and
  // to the cards that don't have a dropdown
  if (!waiting) {
    waiting = true;
    setTimeout(handleSurfaceChangedDelayed, 500);
  }
}

function watchForChangingBoard() {
  var surface = document.querySelector('#surface');
  observeDOM(surface, handleSurfaceChanged);
}

// on DOM load
$(function () {
  "use strict";
  var addInterval = setTimeout(applyExtension, 500);
  // Look for clicks on the .js-share class, which is
  // the "Share, Print, Export..." link on the board header option list
  $(document).on('mouseup', function () {
    //addInterval = setInterval(addExportLink, 500);
  });
});
