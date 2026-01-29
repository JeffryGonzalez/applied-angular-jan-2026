import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import type { Book } from './book';

@Component({
  selector: 'app-books-stats',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats stats-vertical sm:stats-horizontal shadow">
      <div class="stat">
        <div class="stat-title">Total</div>
        <div class="stat-value">{{ total() }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Earliest</div>
        <div class="stat-value text-primary">{{ earliest() ?? '—' }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Latest</div>
        <div class="stat-value text-secondary">{{ latest() ?? '—' }}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Avg Pages</div>
        <div class="stat-value">{{ avgPages() }}</div>
        <div class="stat-desc">rounded to 1 decimal</div>
      </div>
    </div>
  `,
})
export class BooksStatsComponent {
  private readonly _books = signal<Book[]>([]);

  @Input() set books(value: Book[] | null | undefined) {
    this._books.set(value ?? []);
  }

  total = computed(() => this._books().length);

  earliest = computed(() => {
    const years = this._books()
      .map((b) => b.year)
      .filter((y) => Number.isFinite(y));
    return years.length ? Math.min(...years) : null;
  });

  latest = computed(() => {
    const years = this._books()
      .map((b) => b.year)
      .filter((y) => Number.isFinite(y));
    return years.length ? Math.max(...years) : null;
  });

  avgPages = computed(() => {
    const pages = this._books().map((b) => b.pages ?? 0);
    const n = pages.length || 1;
    return Math.round((pages.reduce((a, c) => a + c, 0) / n) * 10) / 10;
  });
}
