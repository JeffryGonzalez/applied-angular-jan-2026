import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BookEntity } from '../types/bookEntity';

@Component({
  selector: 'app-books',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout],
  template: `
    <app-ui-page title="list">
      @let s = stats();
      <p>Total number of books: {{ s.totalBooks }}</p>
      <p>Average Pages: {{ s.averagePages }}</p>
      <p>Total Pages: {{ s.totalPages }}</p>
      <p>Oldest in the Collection: {{ s.oldest < 0 ? -s.oldest + ' BC' : s.oldest }}</p>
      <p>Newest in the Collection: {{ s.latestPublished }}</p>
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
    </app-ui-page>
  `,
  styles: ``,
})
export class BooksPage {
  booksResource = httpResource<BookEntity[]>(() => '/api/books');
  books = computed(() => this.booksResource.value() ?? []);

  stats = computed(() => {
    const totalPages = this.books().reduce((total, book) => total + book.pages, 0);
    const totalBooks = this.books().length;
    const averagePages = totalPages === 0 ? 0 : totalPages / totalBooks;
    const latestPublished = this.books().reduce(
      (max, book) => (book.year > max ? book.year : max),
      0,
    );
    const oldest = this.books().reduce((min, book) => (book.year < min ? book.year : min), 0);
    return {
      totalBooks,
      averagePages,
      totalPages,
      latestPublished,
      oldest,
    };
  });
}
