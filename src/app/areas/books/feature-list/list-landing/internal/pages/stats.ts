import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { Book } from './book-type';

@Component({
    selector: 'app-stats',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
    <div class="stats-container flex flex-wrap justify-center items-center gap-4">
        <div class="stats shadow m-0">
            <div class="stat">
                <div class="stat-title">Total Pages</div>
                <div class="stat-value text-secondary">{{ totalPages() }}</div>
                <div class="stat-desc">Thats a lot of Pages!</div>
            </div>
        </div>
        <div class="stats shadow">
            <div class="stat">
                <div class="stat-title">Total Books</div>
                <div class="stat-value text-secondary">{{ totalBooks() }}</div>
                <div class="stat-desc">Thats a lot of Books!</div>
            </div>
        </div>
        <div class="stats shadow">
            <div class="stat">
                <div class="stat-title">Average Page Count</div>
                <div class="stat-value text-secondary">{{ averagePageCount() }}</div>
                <div class="stat-desc">Average number of pages per book</div>
            </div>
        </div>
        <div class="stats shadow">
            <div class="stat">
                <div class="stat-title">Earliest Year</div>
                <div class="stat-value text-secondary">{{ earliestYear() }}</div>
                <div class="stat-desc">The oldest book in the collection</div>
            </div>
        </div>
    </div>
    `,
    styles: ``
})
export class Stats {
  booksResource = httpResource<Book[]>(() => '/api/books');
  totalBooks = computed(() => this.booksResource.value()?.length ?? 0);
  totalPages = computed(() => (this.booksResource.value() ?? []).reduce((sum, book) => sum + book.pages, 0));
  averagePageCount = computed(() => {
    const totalBooks = this.totalBooks();
    return totalBooks > 0 ? this.totalPages() / totalBooks : 0;
  });
  earliestYear = computed(() => (this.booksResource.value() ?? []).reduce((min, book) => book.year < min ? book.year : min, Infinity));
}