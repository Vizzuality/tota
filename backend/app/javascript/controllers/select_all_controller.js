import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    const html = `
      <div class="form-check">
        <input class="form-check-input check_boxes optional" type="checkbox" name="select_all" id="select_all" />
        <label class="form-check-label collection_check_boxes" for="select_all" id="select_all">Select All</label>
      </div>
    `
    const firstFormCheck = this.element.querySelector('.form-check');
    if (firstFormCheck) {
      firstFormCheck.insertAdjacentHTML('beforebegin', html);
      const selectAllElement = this.element.querySelector('#select_all');
      selectAllElement.addEventListener('change', this.handleSelectAll);
    }
  }

  handleSelectAll = (event) => {
    const checked = event.target.checked;
    this.element.querySelectorAll('.form-check:not([name=select_all]) input').forEach((el) => {
      el.checked = checked;
    });
  }
}
