import Rails from '@rails/ujs'
import { Controller } from '@hotwired/stimulus'
import Sortable from 'sortablejs'

export default class extends Controller {
  connect() {
    this._sortable = Sortable.create(this.element, {
      handle: '.sortable-handle',
      onEnd: (evt) => {
        const sortUrl = evt.item.dataset.sortableUrl;
        Rails.ajax({
          url: sortUrl,
          type: 'POST',
          data: `position=${evt.newIndex}`,
          success: function () {
            console.log('success')
          }
        });
      }
    })
  }

  disconnect() {
    this._sortable.destroy();
  }
}
