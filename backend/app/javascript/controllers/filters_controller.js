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
      placement: 'bottom',
      content: ' '
    })
    document.addEventListener('mousedown', this.handleOutsideClick)
    this.buttonTarget.addEventListener('inserted.bs.popover', this.handlePopoverOpen)
    this.buttonTarget.addEventListener('hidden.bs.popover', this.handlePopoverClose)
  }

  disconnect() {
    this.buttonTarget.removeEventListener('hidden.bs.popover', this.handlePopoverClose)
    this._popup.dispose()
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  handleOutsideClick = (event) => {
    if (!this.element.contains(event.target)) {
      this._popup.hide()
    }
  }

  handlePopoverOpen = (event) => {
    const body = this._popup.getTipElement().querySelector('.popover-body')
    this._moveContent(this.popupTarget, body)
  }

  handlePopoverClose = (event) => {
    const body = this._popup.getTipElement().querySelector('.popover-body')
    this._moveContent(body, this.popupTarget)
  }

  _moveContent(fromElement, toElement) {
    while (fromElement.childNodes.length > 0) {
      toElement.appendChild(fromElement.childNodes[0])
    }
  }
}
