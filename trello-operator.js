
// Globals
var $,
    byteString,
    xlsx,
    ArrayBuffer,
    Uint8Array,
    Blob,
    saveAs;

// BUTTON

function handleCollapseButton(e) {

  // Check if collapsing or expanding
  var button = $(e.target);
  var card = button.parent();

  // Story title
  var title = card.find('.card-label').attr('title');
  var collapsed = card.hasClass('collapsed');

  // If there is no label, the cards is the current one
  var cards = title === undefined ? card : getCardsByTitle(title);

  // Reverse buttons direcitons for this story
  var buttons = cards.find('.collapse-button');
  if (collapsed) {
    buttons.removeClass('icon-down').addClass('icon-up');
  } else {
    buttons.removeClass('icon-up').addClass('icon-down');
  }

  // Collapse or expand
  if (collapsed) {
    cards.removeClass('collapsed');
    if (title) {
      expandStory(title);
    } else {
      expandCard(card);
    }
  } else {
    cards.addClass('collapsed');
    if (title) {
      collapseStory(title);
    } else {
      collapseCard(card);
    }
  }

  // Stop propagation
  e.preventDefault();
  e.stopPropagation();
}

function createCollapseButton() {
  var button = $('<span></span>');
  button.addClass("collapse-button icon-sm icon-up list-card-operation dark-hover js-open-quick-card-editor js-card-menu");
  button.on('click', handleCollapseButton);

  return button;
}

/**
 * Adds the plugin buttons to the page
 */
function addButtons() {
  var collapseButton = createCollapseButton();
  $('.list-card').append(collapseButton);
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
  setDisplayOfCards(cards, 'unset');
}

function collapseStory(title) {
  console.log('Collapsing story "' + title + '"');
  var cards = getCardsByTitle(title);
  setDisplayOfCards(cards, 'none');
}

function expandCard(card) {
  console.log('Expanding card');
  setDisplayOfCards(card, 'unset');
}

function collapseCard(card) {
  console.log('Collapsing card');
  setDisplayOfCards(card, 'none');
}

function setDisplayOfCards(cards, display) {
  cards.find('.list-card-title').css('display', display);
  cards.find('.badges').css('display', display);
  cards.find('.sticker').css('display', display);
  if (display === 'none') {
    cards.find('.list-card-details').addClass('collapsed');
  } else {
    cards.find('.list-card-details').removeClass('collapsed');
  }
  cards.find('.list-card-members').css('display', display);
}

function expandEverything() {
    $('.list-card-title').css('display', 'unset');
    $('.badges').css('display', 'unset');
    $('.sticker').css('display', 'unset');
    $('.list-card-details').css('margin', '0');
    $('.list-card-members').css('display', 'unset');
}

function collapseEverything() {
    $('.list-card-title').css('display', 'none');
    $('.badges').css('display', 'none');
    $('.sticker').css('display', 'none');
    $('.list-card-details').css('margin', '0');
    $('.list-card-members').css('display', 'none');
}

function applyExtension() {
  //collapse()
  addEventListeners();
  addButtons();
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
