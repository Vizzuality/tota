import Rails from '@rails/ujs'
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    frame: String
  }

  connect() {
    this._addHiddenRefreshFormActionInput()
    this._resetFrameTarget();
  }

  update() {
    const frame = document.getElementById(this.frameValue);
    if (frame) frame.setAttribute('target', '');
    this.refreshFormActionInput.value = 'update'
    Rails.fire(this.element, 'submit')
  }

  _resetFrameTarget() {
    const frame = document.getElementById(this.frameValue);
    if (frame) frame.setAttribute('target', '_top');
  }

  _addHiddenRefreshFormActionInput() {
    if (!this.refreshFormActionInput) {
      const hidden = document.createElement('input')
      hidden.setAttribute('type', 'hidden')
      hidden.setAttribute('name', 'refresh_form_action')
      this.element.appendChild(hidden)
    }
  }

  get refreshFormActionInput() {
    return this.element.querySelector('[name=refresh_form_action]')
  }
}
