import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { PageLayout } from '@ht/shared/ui-common/layouts/page';
import { DecimalPipe } from '@angular/common';
import { Book } from '../models/book';
import { bookStore } from '../store/bookStore';

@Component({
  selector: 'ht-home-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageLayout, JsonPipe, DecimalPipe],
  providers: [bookStore],
  template: `
    <app-ui-page title="list">
      <div class="stats shadow flex flex-row bg-base-100 mb-4 p-6 rounded-lg">
        <div class="stat place-items-center">
          <div class="stat-title">Number Of Books</div>
          <div class="stat-value text-primary">{{ numberOfBooks() }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Oldest Book</div>
          <div class="stat-value text-primary">Published in {{ oldestBook().year }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Newest Book</div>
          <div class="stat-value text-primary">Published in {{ newestBook().year }}</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title">Average Page Number</div>
          <div class="stat-value text-primary">{{ averagePageNumber() | number: '1.0-0' }}</div>
        </div>
      </div>
      <div class="grid  md:grid-cols-3  grid-cols-1 gap-4">
        @for (book of bookList(); track book.id) {
          <div class="bg-base-100 p-2  rounded-lg shadow-2xl  flex flex-col h-full w-full">
            <h3 class="text-xl p-2 font-boldest text-secondary w-full">{{ book.title }}</h3>
            <hr class="divider m-0" />
            <div class="stats flex flex-col p-6">
              <p>ID: {{ book.id }}</p>
              <p>Author: {{ book.author }}</p>
              <p>Year: {{ book.year }}</p>
            </div>
          </div>
        }
      </div>
      <pre>{{ booksResource.value() | json }}</pre>
    </app-ui-page>
  `,
  styles: ``,
})
export class HomePage {
  signalStore = inject(bookStore);
  booksResource = httpResource<Book[]>(() => '/api/books');
  bookList = computed(() => this.booksResource.value() ?? []);
  // I think I struggle with the state stuff, im not sure how to get the booklist into the bookStore
  numberOfBooks = computed(() => this.bookList().length);
  oldestBook = computed(() => {
    return this.bookList().reduce((lowest, current) =>
      current.year < lowest.year ? current : lowest,
    );
  });
  newestBook = computed(() => {
    return this.bookList().reduce((newest, current) =>
      current.year > newest.year ? current : newest,
    );
  });
  averagePageNumber = computed(() => {
    let pageTotal = 0;
    this.bookList().forEach((book) => (pageTotal += book.pages));
    return pageTotal / this.bookList().length;
  });
}
