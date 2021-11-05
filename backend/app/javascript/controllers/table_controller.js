import Rails from '@rails/ujs'
import { Turbo } from '@hotwired/turbo-rails'
import CheckboxSelectAll from 'stimulus-checkbox-select-all'

class TableController extends CheckboxSelectAll {
  static targets = ['selectAllDropdown']

  _selectedRecordsMode = 'pageOnly'

  get selectedRecordsMode() {
    return this._selectedRecordsMode
  }

  set selectedRecordsMode(value) {
    this._selectedRecordsMode = value
    if (value === 'pageOnly') {
      this.selectAllDropdownTarget.innerHTML = ''
    } else {
      this.selectAllDropdownTarget.innerHTML =
        '<span class="badge bg-warning">ALL</span>'
    }
  }

  connect() {
    super.connect()

    this.element.querySelectorAll('tr[data-link]').forEach((row) => {
      row.addEventListener('click', this.rowClickHandler.bind(this, row))
    })
    if (document.forms['delete_selected']) {
      document.forms['delete_selected'].addEventListener(
        'submit',
        this.batchFormSubmitHandler
      )
    }
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.addEventListener('input', this.checkBoxTargetChangeHandler)
    })
  }

  disconnect() {
    if (document.forms['delete_selected']) {
      document.forms['delete_selected'].removeEventListener(
        'submit',
        this.batchFormSubmitHandler
      )
    }
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.removeEventListener('change', this.checkBoxTargetChangeHandler)
    })
    super.disconnect()
  }

  rowClickHandler = (row, event) => {
    if (['A', 'BUTTON', 'UL', 'LI', 'INPUT'].includes(event.target.tagName))
      return

    event.preventDefault()
    event.stopPropagation()

    Turbo.visit(row.dataset.link)
  }

  batchFormSubmitHandler = (event) => {
    const form = event.target
    const idsInput = form.querySelector('[name=ids]')

    if (
      this.checked.length === this.checkboxTargets.length &&
      this.selectedRecordsMode === 'all'
    ) {
      idsInput.value = 'all'
    } else {
      idsInput.value = this.checked.map((checkbox) => checkbox.value).join(',')
    }
  }

  checkBoxTargetChangeHandler = (event) => {
    this.selectedRecordsMode = 'pageOnly'
  }

  selectAllRecords(event) {
    this.selectAllCheckboxes()
    this.selectedRecordsMode = 'all'
    event.preventDefault()
  }

  selectPageOnlyRecords(event) {
    this.selectedRecordsMode = 'pageOnly'
    this.selectAllCheckboxes()
    event.preventDefault()
  }

  selectAllCheckboxes() {
    this.selectedRecordsMode = 'pageOnly'
    this.checkboxTargets.forEach((checkbox) => {
      checkbox.checked = true
      checkbox.dispatchEvent(new Event('change'))
    })
  }
}

export default TableController
