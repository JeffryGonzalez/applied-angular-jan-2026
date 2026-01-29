import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Book } from './book';
import booksData from './books.mocks';
import { BooksStatsComponent } from './books-stats.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, BooksStatsComponent],
  template: `
    <div class="mb-4">
      <app-books-stats [books]="books()"></app-books-stats>
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th class="w-20">ID</th>
            <th>Title</th>
            <th class="w-64">Author</th>
            <th class="w-28 text-right">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let b of books()">
            <td>{{ b.id }}</td>
            <td class="font-medium">{{ b.title }}</td>
            <td>{{ b.author }}</td>
            <td class="text-right">{{ b.year }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class BooksListComponent {
  books = signal<Book[]>(booksData as Book[]);
}
