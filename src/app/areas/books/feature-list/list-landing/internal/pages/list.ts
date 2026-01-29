import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { Book } from './book-type';
type SortableBookKey = 'author' | 'country' | 'language' | 'pages' | 'title' | 'year' | 'id';

@Component({
    selector: 'app-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
                <!-- // set author sort order based on local storage -->
              <th (click)="sortBy('author')">Author</th>
              <th (click)="sortBy('country')">Country</th>
              <th>Image</th>
              <th (click)="sortBy('language')">Language</th>
              <th>Link</th>
              <th (click)="sortBy('pages')">Pages</th>
              <th (click)="sortBy('title')">Title</th>
              <th (click)="sortBy('year')">Year</th>
              <th (click)="sortBy('id')">ID</th>
            </tr>
          </thead>
          <tbody>
            @for (book of sortedBooks(); track book.id) {
            <tr>
              <td>{{ book.author }}</td>
              <td>{{ book.country }}</td>
              <td><img [src]="book.imageLink" alt="{{ book.title }}" /></td>
              <td>{{ book.language }}</td>
              <td><a [href]="book.link" target="_blank">Link</a></td>
              <td>{{ book.pages }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.id }}</td>
            </tr>
            }
            
          </tbody>
        </table>
      </div>
    `,
    styles: ``
})

  export class List {
  booksResource = httpResource<Book[]>(() => '/api/books');
    sortKey = signal<SortableBookKey>('author');
    isSortedAsc = signal<Record<SortableBookKey, boolean>>({
      author: this.getLocalStorageSort() === 'asc',
      country: true,
      language: true,
      pages: true,
      title: true,
      year: true,
      id: true
    });

    sortedBooks = computed(() => {
      const books = this.booksResource.value() ?? [];
      const key = this.sortKey();
      const asc = this.isSortedAsc()[key];
      return [...books].sort((a, b) => {
        if (a[key] < b[key]) return asc ? -1 : 1;
        if (a[key] > b[key]) return asc ? 1 : -1;
        return 0;
      });
    });

    sortBy = (key: SortableBookKey) => {
      const current = this.isSortedAsc();
      const nextAsc = this.sortKey() === key ? !current[key] : true;
      this.sortKey.set(key);
      this.isSortedAsc.set({ ...current, [key]: nextAsc });
      if (key === 'author') {
        this.setLocalStorageSort(nextAsc ? 'asc' : 'desc');
      }
    };

  getLocalStorageSort() {
    return localStorage.getItem('sortOrder') as 'asc' | 'desc' || 'asc';
  }

  setLocalStorageSort(order: 'asc' | 'desc') {
    localStorage.setItem('sortOrder', order);
  }

}