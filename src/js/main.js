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
