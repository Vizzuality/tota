import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    frame: String
  }

  connect() {
    this._resetFrameTarget();
    this.element.addEventListener('submit', this.handleSubmit);
  }

  disconnect() {
    this.element.removeEventListener('submit', this.handleSubmit);
  }

  update(e) {
    const frame = document.getElementById(this.frameValue);
    frame.setAttribute('target', e.target.dataset?.targetForm || '');
    this.element.requestSubmit();
  }

  handleSubmit = (event) => {
    const form = event.target;
    if (event.submitter?.name === 'commit') {
      this._resetFrameTarget();
    }
  }

  _resetFrameTarget() {
    const frame = document.getElementById(this.frameValue);
    if (frame) {
      frame.setAttribute('target', '_top');
    } else {
      console.error(`refresh_form_controller: missing frame ${this.frameValue}`);
    }
  }
}
