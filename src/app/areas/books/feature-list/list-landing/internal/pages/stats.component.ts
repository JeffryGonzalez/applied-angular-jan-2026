import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { bookStore } from '../bookStore';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `<app-ui-page title="Stats for ya">
    @let s = bookStore.stats();
    <p>Total number of books: {{ s.totalBooks }}</p>
    <p>Average Pages: {{ s.averagePages }}</p>
    <p>Total Pages: {{ s.totalPages }}</p>
    <p>Oldest in the Collection: {{ s.oldest < 0 ? -s.oldest + ' BC' : s.oldest }}</p>
    <p>Newest in the Collection: {{ s.latestPublished }}</p>
  </app-ui-page>`,
  styles: ``,
})
export class StatsComponent {
  protected bookStore = inject(bookStore);
}
