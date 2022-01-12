import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static values = {
    frame: String
  }

  connect() {
    this._resetFrameTarget();
  }

  update() {
    const frame = document.getElementById(this.frameValue);
    frame.setAttribute('target', '');
    this.element.requestSubmit();
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
