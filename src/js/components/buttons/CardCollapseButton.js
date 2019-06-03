import $ from 'jquery'
import {Component} from '../Component'

export class CardCollapseButton extends Component {
  constructor() {
    super('.list-card:not(:has(.collapse-button))')
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(e) {

    // Check if collapsing or expanding
    const button = $(e.target)
    const card = button.parent()

    // Story title
    const title = card.find('.card-label').attr('title')
    const collapsed = card.hasClass('collapsed')

    // If there is no label, the cards is the current one
    const cards = title === undefined ? card : getCardsByTitle(title)

    // Reverse buttons direcitons for this story
    const buttons = cards.find('.collapse-button')
    if (collapsed) {
      buttons.removeClass('icon-down').addClass('icon-up')
    } else {
      buttons.removeClass('icon-up').addClass('icon-down')
    }

    // Collapse or expand
    if (collapsed) {
      cards.removeClass('collapsed')
      if (title) {
        expandStory(title)
      } else {
        expandCard(card)
      }
    } else {
      cards.addClass('collapsed')
      if (title) {
        collapseStory(title)
      } else {
        collapseCard(card)
      }
    }

    // Stop propagation
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    if (this.button === undefined) {
      this.button = $('<span/>')
      const classes = [
        "collapse-button",
        "icon-sm",
        "icon-up",
        "list-card-operation",
        "dark-hover",
        "js-open-quick-card-editor",
        "js-card-menu",
      ]

      this.button.addClass(classes.join(' '))
      this.button.on('click', this.handleButtonClick)
    }

    return this.button
  }

}
