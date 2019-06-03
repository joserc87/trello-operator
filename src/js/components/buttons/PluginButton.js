import {Component} from '../Component'
import $ from 'jquery'
import {
  expandEverything,
  collapseEverything,
} from '../../utils/trello/ui'


export class PluginButton extends Component {
  constructor() {
    super('.board-header:not(:has(.trello-operator-header-btn))')
  }

  renderContainer() {
    return $('<span/>', {
      class: 'board-header-btn trello-operator-header-btn'
    })
  }

  renderIcon() {
    return $('<span/>', {
      class: 'board-header-btn-icon icon-sm plugin-icon recolorable trello-operator-icon',
    })
  }

  renderCollapseButton() {
    return $('<span/>', {
      class: 'board-header-btn-text u-text-underline',
      text: "-><-",
      click: collapseEverything,
    })
  }

  renderExpandButton() {
    return $('<span/>', {
      class: 'board-header-btn-text u-text-underline',
      text: "<-->",
      click: expandEverything,
    })
  }

  render() {
    const container = this.renderContainer()
    container.append(this.renderIcon());
    container.append(this.renderCollapseButton());
    container.append(this.renderExpandButton());
    return container;
  }

}
