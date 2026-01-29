import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { book } from './list-landing/internal/pages/home';

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>title</th>
            <th>id</th>
            <th>author</th>
            <th>year</th>
          </tr>
        </thead>
        <tbody>
          @for (book of booksResource.value(); track book.title) {
            <tr>
              <td>{{ book.title }}</td>
              <td>{{ book.id }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class List {
  booksResource = httpResource<book[]>(() => '/api/books');
}
