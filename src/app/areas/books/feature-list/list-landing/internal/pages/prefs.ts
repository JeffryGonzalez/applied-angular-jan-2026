import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';

@Component({
  selector: 'app-prefs-pages-',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `<app-ui-page title="Preferences">
    <label class="select">
      <span class="label">Default Sort Field</span>
      <select class="select select-primary" (change)="updateDefaultSort($event)">
        <option disabled selected>Pick a property</option>
        <option>Title</option>
        <option>Author</option>
        <option>Year</option>
      </select>
    </label>

    <label class="select">
      <span class="label">Default Sort Method</span>
      <select class="select select-primary" (change)="updateDefaultSortMethod($event)">
        <option disabled selected>Pick a method</option>
        <option>Ascending</option>
        <option>Descending</option>
      </select>
    </label>
  </app-ui-page>`,
  styles: ``,
})
export class PrefsPage {
  updateDefaultSort(option: Event) {
    localStorage.setItem('DefaultSort', (option.target as HTMLSelectElement).value);
  }
  updateDefaultSortMethod(option: Event) {
    localStorage.setItem('DefaultSortMethod', (option.target as HTMLSelectElement).value);
  }
}
