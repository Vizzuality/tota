import { Controller } from '@hotwired/stimulus'
import SimpleBar from 'simplebar'

export default class extends Controller {
  static targets = ['sidebar', 'simpleBar']

  connect() {
    this._simpleBar = new SimpleBar(this.simpleBarTarget)

    this.transitionEndEvent = this.sidebarTarget.addEventListener(
      'transitionend',
      () => {
        window.dispatchEvent(new Event('resize'))
      }
    )
  }

  disconnect() {
    this._simpleBar.unMount()
  }

  toggle() {
    this.sidebarTarget.classList.toggle('collapsed')
  }
}
