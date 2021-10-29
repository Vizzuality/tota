import { Controller } from '@hotwired/stimulus'
import { createPopper } from '@popperjs/core'

export default class extends Controller {
  static targets = ['button', 'popup']

  connect() {
    const popupEl = this.popupTarget
    this._popup = new bootstrap.Popover(this.buttonTarget, {
      html: true,
      sanitize: false,
      container: this.element,
      /* content: this.popupTarget, */
      placement: 'bottom',
      content() {
        return popupEl.innerHTML
      },
    })
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  disconnect() {
    this._popup.dispose()
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  handleOutsideClick = (event) => {
    if (!this.element.contains(event.target)) {
      this._popup.hide()
    }
  }
}
