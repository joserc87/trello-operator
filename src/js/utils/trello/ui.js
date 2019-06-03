import $ from 'jquery'

export function expandStory(title) {
  console.log('Expanding story "' + title + '"');
  var cards = getCardsByTitle(title);
  setCardsExpanded(cards, true);
}

export function collapseStory(title) {
  console.log('Collapsing story "' + title + '"');
  var cards = getCardsByTitle(title);
  setCardsExpanded(cards, false);
}

export function expandCard(card) {
  console.log('Expanding card');
  setCardsExpanded(card, true);
}

export function collapseCard(card) {
  console.log('Collapsing card');
  setCardsExpanded(card, false);
}

/**
 * Sets a card as collapsed or expanded 
 * @param cards The list of cards, retrieved by jQuery
 * @param expanded boolean. True to expand, false to collapse
 */
export function setCardsExpanded(cards, expanded) {
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

export function expandEverything() {
  $('.collapse-button').removeClass('icon-down').addClass('icon-up');
  $('.list-card').removeClass('collapsed');

  $('.list-card-title').css('display', 'unset');
  $('.badges').css('display', 'unset');
  $('.sticker').css('display', 'unset');
  $('.list-card-details').removeClass('collapsed');
  $('.list-card-members').css('display', 'unset');
}

export function collapseEverything() {
  $('.collapse-button').removeClass('icon-up').addClass('icon-down');
  $('.list-card').addClass('collapsed');

  $('.list-card-title').css('display', 'none');
  $('.badges').css('display', 'none');
  $('.sticker').css('display', 'none');
  $('.list-card-details').addClass('collapsed');
  $('.list-card-members').css('display', 'none');
}

/**
 * Given a title, find all the cards that contain a label with that title
 */
export function getCardsByTitle(title) {
  function filterByTitle(index, element) {
    return title === undefined || element.title === title;
  }

  if (title !== undefined) {
    return $('.card-label').filter(filterByTitle).parent().parent().parent();
  } else {
    return $('.card-label').filter(filterByTitle).parent().parent().parent();
  }
}
