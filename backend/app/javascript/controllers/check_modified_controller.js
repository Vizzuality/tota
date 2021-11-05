import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    this.unsaved = false

    document.addEventListener('turbo:before-visit', this.handleBeforeUnload)

    this.element.querySelectorAll('input, select').forEach((element) => {
      element.addEventListener('input', this.trackChanges)
      element.addEventListener('change', this.trackChanges)
    })
    this.element.addEventListener('submit', this.onSubmit)
  }

  disconnect() {
    document.removeEventListener('turbo:before-visit', this.handleBeforeUnload)
    this.element.querySelectorAll('input, select').forEach((element) => {
      element.removeEventListener('input', this.trackChanges)
      element.removeEventListener('change', this.trackChanges)
    })
    this.element.removeEventListener('submit', this.onSubmit)
  }

  handleBeforeUnload = () => {
    if (this.unsaved && !window.confirm('Changes you made may not be saved')) {
      event.preventDefault()
    }
  }

  onSubmit = () => {
    this.unsaved = false
  }

  trackChanges = () => {
    this.unsaved = true
  }
}
