
// Globals
var $,
    byteString,
    xlsx,
    ArrayBuffer,
    Uint8Array,
    Blob,
    saveAs,
    collapsed = false;


function addEventListeners() {
  $('.card-label').dblclick(function(e) {
    //alert('double click!');
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
      if (collapsed) {
        expandEverything();
      } else {
        collapseEverything();
      }
      collapsed = !collapsed;
      e.stopPropagation();
  });
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
}

// on DOM load
$(function () {
    "use strict";
    var addInterval = setInterval(applyExtension, 500);
    // Look for clicks on the .js-share class, which is
    // the "Share, Print, Export..." link on the board header option list
    $(document).on('mouseup', function () {
        //addInterval = setInterval(addExportLink, 500);
    });
});
