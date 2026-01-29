import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { BookEntity, SortBy } from './book-types';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ht-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, DecimalPipe],
  template: `
    <app-ui-page title="List of Cool Books">
      @if (stats.booksResponse.hasValue()) {
        <div class="flex flex-col gap-4">
          <div class="overflow-x-auto rounded-box border border-base-300">
            <table class="table">
              <thead>
                <tr>
                  <th>Total Number of Books</th>
                  <th>Earliest Year</th>
                  <th>Latest Year</th>
                  <th>Average Pages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ stats.totalBooks() }}</td>
                  <td>{{ stats.earliestYear() }}</td>
                  <td>{{ stats.latestYear() }}</td>
                  <td>{{ stats.averagePages() | number: '1.0-0' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th (click)="sortByColumn('id')" class="cursor-pointer hover:bg-base-300">
                    <div class="flex items-center gap-2">
                      ID
                      @if (sortBy() === 'id') {
                        <span>{{ isAscending() ? '▲' : '▼' }}</span>
                      }
                    </div>
                  </th>
                  <th (click)="sortByColumn('title')" class="cursor-pointer hover:bg-base-300">
                    <div class="flex items-center gap-2">
                      Title
                      @if (sortBy() === 'title') {
                        <span>{{ isAscending() ? '▲' : '▼' }}</span>
                      }
                    </div>
                  </th>
                  <th (click)="sortByColumn('author')" class="cursor-pointer hover:bg-base-300">
                    <div class="flex items-center gap-2">
                      Author
                      @if (sortBy() === 'author') {
                        <span>{{ isAscending() ? '▲' : '▼' }}</span>
                      }
                    </div>
                  </th>
                  <th (click)="sortByColumn('year')" class="cursor-pointer hover:bg-base-300">
                    <div class="flex items-center gap-2">
                      Year
                      @if (sortBy() === 'year') {
                        <span>{{ isAscending() ? '▲' : '▼' }}</span>
                      }
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                @for (book of sortedBooks(); track book.id) {
                  <tr>
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.year }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      } @else {
        @if (stats.booksResponse.isLoading()) {
          <div class="flex justify-center items-center min-h-screen">
            <span class="loading loading-spinner text-primary"></span>
          </div>
        } @else {
          @if (stats.booksResponse.error()) {
            <div class="flex justify-center items-center">
              <p class="text-error">Error loading books</p>
            </div>
          }
        }
      }
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  stats = new Stats();

  sortBy = signal<SortBy | 'id'>('title');
  isAscending = signal<boolean>(true);

  sortByColumn(column: SortBy | 'id'): void {
    if (this.sortBy() === column) {
      this.isAscending.set(!this.isAscending());
    } else {
      this.sortBy.set(column);
      this.isAscending.set(true);
    }
  }

  sortedBooks = computed(() => {
    const books = this.stats.booksResponse.value() ?? [];
    const booksList = [...books];
    const sortByValue = this.sortBy();
    const ascending = this.isAscending();

    return booksList.sort((a, b) => {
      let comparison = 0;

      if (sortByValue === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortByValue === 'author') {
        comparison = a.author.localeCompare(b.author);
      } else if (sortByValue === 'year') {
        comparison = a.year - b.year;
      } else if (sortByValue === 'id') {
        comparison = a.id - b.id;
      }

      return ascending ? comparison : -comparison;
    });
  });
}

export class Stats {
  booksResponse = httpResource<BookEntity[]>(() => '/api/books');
  totalBooks = computed(() => this.booksResponse.value()?.length ?? 0);
  earliestYear = computed(() => {
    const books = this.booksResponse.value() ?? [];
    if (books.length === 0) return 0;
    return books.reduce((min, book) => (book.year < min ? book.year : min), books[0].year);
  });
  latestYear = computed(() => {
    const books = this.booksResponse.value() ?? [];
    if (books.length === 0) return 0;
    return books.reduce((max, book) => (book.year > max ? book.year : max), books[0].year);
  });
  averagePages = computed(() => {
    const books = this.booksResponse.value() ?? [];
    if (books.length === 0) return 0;
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    return totalPages / books.length;
  });
}
