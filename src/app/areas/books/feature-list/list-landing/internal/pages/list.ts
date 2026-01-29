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
        <tr *ngFor="let book of booksResource.data() || []">
          <td>{{ book.Id }}</td>
          <td>{{ book.Title }}</td>
          <td>{{ book.Author }}</td>
          <td>{{ book.Year }}</td>
        </tr>
        <tr *ngIf="(booksResource.data() || []).length === 0 && !booksResource.loading()">
          <td colspan="4">
            <div class="alert alert-info">
              <p>No Books Yet! Get Busy</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ``,
  standalone: true,
})
export class List {
  booksResource = httpResource<Book[]>(() => '/api/books', {});
}
