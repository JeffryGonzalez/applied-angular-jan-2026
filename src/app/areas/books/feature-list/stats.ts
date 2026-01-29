import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { book } from './list-landing/internal/pages/home';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="stat">
      <div class="stat-title">Total Books</div>
      <div class="stat-value text-secondary">{{ totalBooks() }}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Earliest Year</div>
      <div class="stat-value text-secondary">{{ earliestYear() }}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Latest Year</div>
      <div class="stat-value text-secondary">{{ latestYear() }}</div>
    </div>
    <div class="stat">
      <div class="stat-title">Average Pages</div>
      <div class="stat-value text-secondary">{{ averagePages() }}</div>
    </div>
  `,
})
export class Stats {
  booksResource = httpResource<book[]>(() => '/api/books');
  totalBooks = computed(() => this.booksResource.value()?.length ?? 0);
  earliestYear = computed(
    () => this.booksResource.value()?.reduce((b1, b2) => (b1.year < b2.year ? b1 : b2)).year,
  );
  latestYear = computed(
    () => this.booksResource.value()?.reduce((b1, b2) => (b1.year > b2.year ? b1 : b2)).year,
  );
  totalPages = computed(() =>
    (this.booksResource.value() ?? []).reduce((acc, book) => acc + book.pages, 0),
  );
  averagePages = computed(() => {
    const totalBooks = this.totalBooks();
    if (totalBooks > 0) {
      return this.totalPages() / totalBooks;
    }
    return 0;
  });
}
