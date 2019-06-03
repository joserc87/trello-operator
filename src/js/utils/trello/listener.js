
import observeDOM from '../observeDOM'

export class TrelloChangeListener {

  constructor(delay, listener) {
    this.waiting = false
    this.delay = delay
    this.listener = listener ? [listener] : []
    this.handleSurfaceChanged = this.handleSurfaceChanged.bind(this)
    this.handleSurfaceChangedDelayed = this.handleSurfaceChangedDelayed.bind(this)
  }

  listen() {
    const surface = document.querySelector('#surface')
    observeDOM(surface, handleSurfaceChanged)
  }

  /**
   * This handler will be called many many times
   * On every time the handler is called, we should timeout a callback
   * that will add the button to the toolbar if not present, and
   * to the cards that don't have a dropdown
   */
  handleSurfaceChanged() {
    if (!this.waiting) {
      this.waiting = true
      setTimeout(this.handleSurfaceChangedDelayed, delay)
    }
  }

  handleSurfaceChangedDelayed(e) {
    this.listeners.forEach(listener => {
      listener(e)
    })
    waiting = false;
  }

}
