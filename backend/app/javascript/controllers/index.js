// Load all the controllers within this directory and all subdirectories.
// Controller files must be named *_controller.js.

import { Application } from '@hotwired/stimulus'
import CheckboxSelectAll from 'stimulus-checkbox-select-all'
import controllers from './**/*_controller.js'

const application = Application.start()
controllers.forEach((controller) => {
  application.register(controller.name, controller.module.default)
})
application.register('checkbox-select-all', CheckboxSelectAll)
