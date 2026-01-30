import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Book } from '@ht/shared/data/stores/books/internal/types';

@Component({
  selector: 'app-book-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table class="table mb-8">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of booksResource.value() || []; track book.id) {
          <tr>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.year }}</td>
          </tr>
        }
        @if ((booksResource.value() || []).length === 0 && !booksResource.isLoading) {
          <tr>
            <td colspan="4">
              <div class="alert alert-info">
                <p>No Books Yet! Get Busy</p>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
  standalone: true,
})
export class List {
  booksResource = httpResource<Book[]>(() => '/api/books', {});
}
