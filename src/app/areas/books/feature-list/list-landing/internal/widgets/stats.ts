import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { Book } from '../types/books';

@Component({
  selector: 'app-book-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Total Books</div>
        <div class="stat-value">{{ books().length }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Earliest Book</div>
        <div class="stat-value">{{ earliest() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Latest Book</div>
        <div class="stat-value">{{ latest() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Average Pages</div>
        <div class="stat-value">{{ averagePages() }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class Stats {
  books = input.required<Book[]>();

  earliest = computed(() => {
    if (this.books()?.length > 0) {
      return [...this.books()].sort((a, b) => (a.year < b.year ? -1 : 1))[0].year;
    }
    return 'unknown';
  });

  latest = computed(() => {
    if (this.books()?.length > 0) {
      return [...this.books()].sort((a, b) => (a.year > b.year ? -1 : 1))[0].year;
    }
    return 'unknown';
  });

  averagePages = computed(() => {
    if (this.books()?.length > 0) {
      return (
        this.books()
          .map((b) => b.pages)
          .reduce((sum, b) => (sum += b)) / this.books().length
      );
    }
    return 0;
  });
}
