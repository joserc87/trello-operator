
// Globals
var $,
    byteString,
    xlsx,
    ArrayBuffer,
    Uint8Array,
    Blob,
    saveAs;


function addButtons() {
  var collapseButtonHTML = '<span class="collapse-button icon-sm icon-down list-card-operation dark-hover js-open-quick-card-editor js-card-menu"></span>';
  var collapseButton = document.createElement('span');
  collapseButton.attr('class', "collapse-button icon-sm icon-down list-card-operation dark-hover js-open-quick-card-editor js-card-menu");
  $('.list-card').append(collapseButton);
  $('.list-card').attr('style', 'background: red');
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
    var collapsed = el.parent().parent().hasClass('collapsed');

    if (collapsed) {
      getCardsByTitle(title).removeClass('collapsed');
      expandStory(title);
      //expandEverything();
    } else {
      getCardsByTitle(title).addClass('collapsed');
      collapseStory(title);
      //collapseEverything();
    }
    e.stopPropagation();
  });
}

/**
 * Given a title, find all the cards that contain a label with that title
 */
function getCardsByTitle(title) {
  function filterByTitle(index, element) {
    return element.title == title;
  }

  return $('.card-label').filter(filterByTitle).parent().parent();
}

function expandStory(title) {
  console.log('Expanding story "' + title + '"');
  setDisplay(title, 'unset');
}

function collapseStory(title) {
  console.log('Collapsing story "' + title + '"');
  setDisplay(title, 'none');
}

function setDisplay(title, display) {
  var cards = getCardsByTitle(title);

  cards.find('.list-card-title').css('display', display);
  cards.find('.badges').css('display', display);
  cards.find('.sticker').css('display', display);
  //cards.find('.list-card-details').css('margin', '0');
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
  //addButtons();
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
