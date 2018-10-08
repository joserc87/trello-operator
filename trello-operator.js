
// Globals
var $,
    byteString,
    xlsx,
    ArrayBuffer,
    Uint8Array,
    Blob,
    saveAs;

function collapse() {
    $('.list-card-title').css('display', 'none')
    $('.badges').css('display', 'none')
    $('.sticker').css('display', 'none')
    $('.list-card-details').css('margin', '0')
    $('.list-card-members').css('display', 'none')
}

// on DOM load
$(function () {
    "use strict";
    addInterval = setInterval(collapse, 500);
    // Look for clicks on the .js-share class, which is
    // the "Share, Print, Export..." link on the board header option list
    $(document).on('mouseup', function () {
        //addInterval = setInterval(addExportLink, 500);
        alert('It works!')
    });
});
