import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BookEntity } from '../types/bookEntity';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `<app-ui-page title="List">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        @for ((book of books()); track book) {
          <tr>
            <th>{{ book.title }}</th>
            <td>{{ book.author }}</td>
            <td>{{ book.year < 0 ? -book.year + ' BC' : book.year }}</td>
            <td>{{ book.id }}</td>
          </tr>
        } @empty {
          <div class="alert alert-info">
            <p>Get to the library!</p>
          </div>
        }
      </tbody>
    </table>
  </app-ui-page>`,
  styles: ``,
})
export class ListComponent {
  booksResource = httpResource<BookEntity[]>(() => '/api/books');
  books = computed(() => this.booksResource.value() ?? []);
  currentColumn = signal<keyof BookEntity | null>(null);

  sortAscending = signal(true);
  sortedBooks = computed(() => {
    const books = [...this.books()];
    const column

    return books.sort((a, b) => a.[this.currentColumn].localeCompare(b.author));
  });

  sortBy(column: keyof BookEntity) {
    if (this.currentColumn() === column) {
      this.sortAscending.set(!this.sortAscending());
    } else {
      this.currentColumn.set(column);
      this.sortAscending.set(true);
    }
  }
}
